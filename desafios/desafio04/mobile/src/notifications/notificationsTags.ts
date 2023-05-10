import OneSignal from 'react-native-onesignal'

export function tagUserCreate(name: string, email: string) {
  OneSignal.sendTags({
    userName: name,
    userEmail: email
  })
}
