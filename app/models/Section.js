import realm from '../db/schema';

const MODEL = 'Section';

const Section = (() => {
  return {
    findById,
    findByFormId,
    upsert,
  }

  function findById(id) {
    return realm.objects(MODEL).filtered(`id = '${id}'`)[0];
  }

  function findByFormId(id) {
    return realm.objects(MODEL).filtered(`form_id ==  ${id} SORT(display_order ASC)`);
  }

  function upsert(data) {
    realm.write(() => {
      realm.create(MODEL, data, 'modified');
    });
  }
})()

export default Section;