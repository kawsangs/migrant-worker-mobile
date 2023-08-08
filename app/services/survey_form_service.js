import {WebService} from './web_service';
import endpointHelper from '../helpers/endpoint_helper';

class SurveyFormService extends WebService {
  constructor() {
    super();
  }

  get(id) {
    return super.get(endpointHelper.detailEndpoint('survey_forms', id)); 
  }
}

export default SurveyFormService;