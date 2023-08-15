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
    return realm.objects(MODEL).filtered(`form_id ==  ${id}`);
  }

  function upsert(data) {
    realm.write(() => {
      realm.create(MODEL, _buildData(data), 'modified');
    });
  }

  // private method
  function _buildData(data) {
    return {id: data.id, name: data.name, form_id: data.form_id}
  }
})()

export default Section;