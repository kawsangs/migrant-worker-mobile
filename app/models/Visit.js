import realm from '../db/schema';
import uuidv4 from '../utils/uuidv4';
import Sidekiq from './Sidekiq';

const MODEL = 'Visit'

const Visit = (() => {
  return {
    upsert,
  }

  function upsert(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }

  function uploadAsync(uuid) {
    Sidekiq.upsert({paramUuid: uuid, tableName: MODEL, version: '1'});
    
  }
})()

export default Visit;