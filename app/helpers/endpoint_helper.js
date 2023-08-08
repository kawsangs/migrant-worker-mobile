import { environment } from '../config/environment';

const endpointHelper = (() => {
  return {
    pagingEndpoint,
    detailEndpoint,
    getAbsoluteEndpoint,
    isUrlWithHostname,
  }

  function pagingEndpoint(model, page) {
    return `${environment.apiUrl}/${model}?page=${page}`;
  }

  function detailEndpoint(model, id) {
    return `${environment.apiUrl}/${model}/${id}`;
  }

  function getAbsoluteEndpoint(relativeUrl) {
    if (!relativeUrl) return null;

    return environment.domain + relativeUrl;
  }

  function isUrlWithHostname(url) {
    return new RegExp(`^https?://(${_hostnamePattern()}|${_ipAddressPattern()}|${_localhostPattern()})`).test(url)
  }

  // private method
  function _hostnamePattern() {
    const addressPattern = `[a-z0-9]([-_]{1})?([.]{1})?`;
    const entityTypePattern = `([.][a-z]{2,})`;
    return `(${addressPattern})+${entityTypePattern}(:[0-9]{1,4})?([/])?((/([a-z0-9?&=%-_]*))*)?$`
  }

  function _ipAddressPattern() {
    const octetsPattern = '[0-9]{1,3}';
    return `(${octetsPattern}[.]${octetsPattern}[.]${octetsPattern}[.]${octetsPattern})(:[0-9]{1,4})?((/([a-z0-9?&=%-_]*))*)?$`;
  }

  function _localhostPattern() {
    return `localhost(:[0-9]{1,4})?((/([a-z0-9?&=%-_]*))*)?$`
  }
})();

export default endpointHelper;