import realm from '../db/schema';
import UserWorker from '../workers/user_worker';

export default class Sidekiq {
  static createUser( uuid ) {
    realm.create('Sidekiq', {
      paramUuid: uuid,
      tableName: 'User',
      version: '1'
    }, true)

    UserWorker.performAsync(uuid);
  }

  static delete(paramUuid) {
    realm.write(() => {
      let obj = realm.objects('Sidekiq').filtered('paramUuid="' + paramUuid + '"')[0];
      realm.delete(obj);
    });
  }

  static uploadAllUsers() {
    let users = realm.objects('Sidekiq').filtered('tableName="User"');

    for(let i=0; i<users.length; i++) {
      UserWorker.performAsync(users[i].paramUuid);
    }
  }
}
