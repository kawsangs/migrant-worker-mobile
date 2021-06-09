import countriesImage from '../data/json/countries_image';

const countryHelper = (() => {
  return {
    isAllCountries,
    getCountryImage,
  }

  function isAllCountries(name) {
    return name.toLowerCase().includes('countries');
  }

  function getCountryImage(code) {
    const foundCountry = countriesImage.filter(country => country.code == code)[0];

    if (foundCountry)
      return foundCountry.image;

    return null;
  }
})();

export default countryHelper;