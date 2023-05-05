import axios, { AxiosInstance, AxiosError } from "axios";

import { AppError } from "@utils/AppError";
import { storageAuthTokenGet, storageAuthTokenSave } from "@storage/storageAuthToken";

type SignOut = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOunt: SignOut) => () => void;
};

const api = axios.create({
  baseURL: 'http://192.168.0.103:3333',
}) as APIInstanceProps;

let failedQueu: Array<PromiseType> = []; //fila
let isRefreshing = false;

api.registerInterceptTokenManager = signOut => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async (requestError) => {
    //se dentro do requestoErro tem um response e dentro do response se tem um status
    if (requestError?.response?.status == 401) { //401 ñ autorizada
      // dentro do erro e do response e do data tem a msg expired ou invalid
      if (requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid') {
        const { refresh_token } = await storageAuthTokenGet()

        if (!refresh_token) { //se ñ tem o refresh token desloga o user
          signOut();
          return Promise.reject(requestError);
        }

        const originalRequestConfig = requestError.config; //tds info da requisição

        if (isRefreshing) { //se ta rolando um nv token
          return new Promise((resolve, reject) => {
            failedQueu.push({ //add na fila
              onSuccess: (token: string) => {
                originalRequestConfig.headers = { 'Authorization': `Bearer ${token}` };
                resolve(api(originalRequestConfig));
              },
              onFailure: (error: AxiosError) => {
                reject(error);
              },
            })
          })
        }

        isRefreshing = true;

        //retorna uma nova promise
        return new Promise( async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token }); //rota de envio de nv token
            await storageAuthTokenSave({ token: data.token, refresh_token: data.refresh_token })

            if (originalRequestConfig.data) { //se tem data no origina.. o data é se esta enviando dado junto da requisição
              originalRequestConfig.data = JSON.parse(originalRequestConfig.data);
            }
            //e atualiz o headers
            originalRequestConfig.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            //percorre a fila de requisições
            failedQueu.forEach(request => {
              request.onSuccess(data.token)
            })
            console.log('TOKEN ATUALIZADO')
            resolve(api(originalRequestConfig)) //envia e reprocessa a requisição

          } catch(error: any) {
            //se falha pega a fila e percorre ela e em cada requisição da o error
            failedQueu.forEach(request => {
              request.onFailure(error)
            });

            signOut();
            reject(error);

          } finally { //acabo zera a fila e coloca o refreshing false
            isRefreshing = false;
            failedQueu = []
          }
        })

      }

      signOut(); //se ñ está relacionado com token deslogar o user
    }

    if (requestError.response && requestError.response.data) {
      return Promise.reject(new AppError(requestError.response.data.message));
    } else {
      return Promise.reject(requestError);
    }
  });

  //depois de usar da um eject nele
  return () => {
    api.interceptors.response.eject(interceptTokenManager);
  }
}

export { api };