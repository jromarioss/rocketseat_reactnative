import OneSignal from "react-native-onesignal";

/* export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email); //1p da o nome, 2p o valor
  //OneSignal.deleteTag('user_email'); //deletar a tag e passa so valor
} */

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'José',
    'user_email': 'romassplay@gmail.com',
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount);
}
