const countryHelper = (() => {
  return {
    isAllCountries,
  }

  function isAllCountries(name) {
    return name.toLowerCase().includes('countries');
  }
})();

export default countryHelper;