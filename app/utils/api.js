import { create } from 'apisauce';
import { environment } from '../config/environment';

const api = create({
  baseURL: environment.apiUrl,
  headers: {
    'Authorization': `Bearer ${environment.access_token}`
  }
});

export default api;
