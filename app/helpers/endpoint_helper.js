import { environment } from '../config/environment';

const endpointHelper = (() => {
  return {
    pagingEndpoint,
    detailEndpoint,
  }

  function pagingEndpoint(model, page) {
    return `${environment.apiUrl}/${model}?page=${page}`;
  }

  function detailEndpoint(model, id) {
    return `${environment.apiUrl}/${model}/${id}`;
  }
})();

export default endpointHelper;