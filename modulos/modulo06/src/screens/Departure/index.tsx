import { useUser } from '@realm/react'
import { Car } from 'phosphor-react-native'
import { useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, ScrollView, Alert } from 'react-native'
import {
  useForegroundPermissions,
  watchPositionAsync,
  LocationAccuracy,
  LocationSubscription,
  LocationObjectCoords
} from 'expo-location'

import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { licensePlateValidate } from '../../utils/licensePlateValidate'
import { getAddressLocation } from '../../utils/getAddressLocation'

import { Map } from '../../components/Map'
import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { Loading } from '../../components/Loading'
import { LocationInfo } from '../../components/LocationInfo'
import { TextAreaInput } from '../../components/TextAreaInput'
import { LicensePlateInput } from '../../components/LicensePlateInput'

import { Container, Content, Message } from './styles'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [isLoadingLocation, setIsLoadingLocation] = useState(true)
  const [currentAddress, setCurrentAddress] = useState<string | null>(null)
  const [currentCoords, setCurrentCoords] = useState<LocationObjectCoords | null>(null)

  const [locationForegroundPermissions, requestLocationForegroundPermissions] = useForegroundPermissions()

  const { goBack } = useNavigation()
  const realm = useRealm() //ter acesso ao db
  const user = useUser() 

  const descriptionRef = useRef<TextInput>(null)
  const licensePlateRef = useRef<TextInput>(null)

  function handleDepartureRegister() {
    try{
      if(!licensePlateValidate(licensePlate)) {
        licensePlateRef.current?.focus()
        return Alert.alert('Placa inválida.', 'A placa está inválida!')
      }
  
      if(description.trim().length === 0) {
        descriptionRef.current?.focus()
        return Alert.alert('Finalidade.', 'Por favor, informe uma finalizade!')
      }

      setIsRegistering(true)

      //usa o write para oque quer fazer dentro do db
      realm.write(() => {
        realm.create('Historic', Historic.generate({
          user_id: user!.id, //pg o usuário logado
          license_plate: licensePlate.toUpperCase(),
          description
        }))
      })

      Alert.alert('Saída', 'Saída do veículo registrada.')
      goBack()
    } catch(error) {
      setIsRegistering(false)
      console.log(error)
      Alert.alert('Error', 'Não foi possível registrar.')
    }
  }

  useEffect(() => {
    requestLocationForegroundPermissions()
  }, [])

  useEffect(() => {
    if (!locationForegroundPermissions?.granted) {
      return
    }

    let subscription: LocationSubscription
    watchPositionAsync({
      accuracy: LocationAccuracy.High,
      timeInterval: 1000
    }, (location) => {
      setCurrentCoords(location.coords)
      getAddressLocation(location.coords)
        .then(address => {
          if (address) {
            setCurrentAddress(address)
          }
        })
    })
      .then(response => subscription = response)
      .finally(() => setIsLoadingLocation(false))

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, [locationForegroundPermissions])

  if (!locationForegroundPermissions?.granted) {
    return(
      <Container>
        <Header title='Saída' />
        <Message>
          Você precisa permitir que o aplicativo tenha acesso a localização para utilizar essa funcionalidade.
          Por favor, acesse as configurações do seu dispositivo para conceder esa permissão ao aplicativo.
        </Message>
      </Container>
    )
  }

  if (isLoadingLocation) {
    return <Loading />
  }

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          { currentCoords && (
            <Map coordinates={[
              { latitude: -5.0792, longitude: -42.7895 },
              { latitude: -5.0815, longitude: -42.7792 }
            ]} />
          )}
          
          <Content>
            {currentAddress && 
              <LocationInfo
                icon={Car}
                label='Localização atual'
                description={currentAddress}
              />
            }

            <LicensePlateInput
              ref={licensePlateRef}
              label='Placa do veículo' placeholder='BRA1234' 
              onSubmitEditing={() => descriptionRef.current?.focus()}
              returnKeyType='next'
              onChangeText={setLicensePlate}
              value={licensePlate}
            />
            <TextAreaInput ref={descriptionRef} label='Finalidade' maxLength={100}
              placeholder='Vou utilizar o veículo para...' 
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
              value={description}
            />

            <Button 
              title='Registrar saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Container>
  )
}
