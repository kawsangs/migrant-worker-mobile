import realm from '../db/schema'
import countries from '../data/json/countries'

const CountryModel = (() => {
  return {
    all,
    create,
    deleteAll,
    createCollection
  }

  function createCollection() {
    countries.forEach(country => create(country))
  }

  function all() {
    return realm.objects('Country')
  }

  function create(country) {
    realm.write(() => {
      const attr = (({id, flag, name}) => ({id, name}))(country)
      realm.create('Country', attr);
    })
  }

  function deleteAll() {
    realm.write(() => {
      const countries = realm.objects("Country")
      realm.delete(countries)
    })
  }
})()

export default CountryModel
