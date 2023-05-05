import { createContext, ReactNode, useEffect, useState } from "react";

import { storageUserSave, storageUserGet, storageUserRemove } from "@storage/storageUser";
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from "@storage/storageAuthToken";
import { api } from "@services/api";

import { UserDTO } from "@dtos/UserDTO";

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStorageData: boolean;
  refreshedToken: string;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUserProfile: (userUpdated: UserDTO) => Promise<void>;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [refreshedToken, setRefreshedToken] = useState('');
  const [isLoadingUserStorageData, setLoadingUserStorageData] = useState(true);

  async function userAndTokenUpdate(userData: UserDTO, token: string) {
    // atualiza o cabeçalho
    api.defaults.headers.common['Authorization'] = `Beare ${token}`;
    setUser(userData);
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string, refresh_token: string) {
    try {
      setLoadingUserStorageData(true);
      await storageUserSave(userData);
      await storageAuthTokenSave({ token, refresh_token });
    } catch(error) {
      throw error
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password });

      if (data.user && data.token && data.refresh_token) {
        setLoadingUserStorageData(true);
        await storageUserAndTokenSave(data.user, data.token, data.refresh_token);
        //setUser(data.user); mando la pra cima
        userAndTokenUpdate(data.user, data.token);
      }
    } catch(error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function signOut() {
    try {
      setLoadingUserStorageData(true); // mostra tela carrega
      setUser({} as UserDTO); // limpa o estado
      await storageUserRemove(); // remove do storage
      await storageAuthTokenRemove(); // remover o token
    } catch(error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  async function updateUserProfile(userUpdated: UserDTO) {
    try {
      setUser(userUpdated); // atualiza no estado
      await storageUserSave(userUpdated); // e no storage
    } catch(error) {
      throw error;
    }
  }

  async function loadUserData() {
    try {
      setLoadingUserStorageData(true);
      const userLogged = await storageUserGet();
      const { token } = await storageAuthTokenGet();
      
      if (userLogged && token) {
        userAndTokenUpdate(userLogged, token);
      }
    } catch(error) {
      throw error;
    } finally {
      setLoadingUserStorageData(false);
    }
  }

  function refreshTokenUpdated(newToken: string) {
    setRefreshedToken(newToken);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut)

    //o retorno do useefect é uma função de limpeza
    return () => {
      subscribe();
    }
  }, [signOut]);

  return (
    <AuthContext.Provider value={{
      user, signIn, signOut, isLoadingUserStorageData, updateUserProfile, refreshedToken
    }}>
      {children}
    </AuthContext.Provider>
  );
}