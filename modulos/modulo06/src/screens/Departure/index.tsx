import { useUser } from '@realm/react'
import { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TextInput, ScrollView, Alert } from 'react-native'

import { useRealm } from '../../libs/realm'
import { Historic } from '../../libs/realm/schemas/Historic'
import { licensePlateValidate } from '../../utils/licensePlateValidate'

import { Header } from '../../components/Header'
import { Button } from '../../components/Button'
import { TextAreaInput } from '../../components/TextAreaInput'
import { LicensePlateInput } from '../../components/LicensePlateInput'

import { Container, Content } from './styles'

export function Departure() {
  const [description, setDescription] = useState('')
  const [licensePlate, setLicensePlate] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

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

  return (
    <Container>
      <Header title='Saída' />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
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
