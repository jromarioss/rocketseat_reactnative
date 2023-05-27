import { createRealmContext } from '@realm/react'

import { Historic } from './schemas/Historic'

const realmAccessBehavior: Realm.OpenRealmBehaviorConfiguration = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately
}

export const syncConfig: any = {
  flexible: true,
  newRealmFileBehavior: realmAccessBehavior, // novos banco
  existingRealmFileBehavior: realmAccessBehavior, // banco já existente
}

export const {
  RealmProvider,
  useRealm,
  useQuery,
  useObject
} = createRealmContext({
  schema: [Historic]
})
