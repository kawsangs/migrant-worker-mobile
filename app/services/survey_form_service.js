import DeviceInfo from 'react-native-device-info';

import WebService from './web_service';
import questionService from './question_service';
import endpointHelper from '../helpers/endpoint_helper';
import Form from '../models/Form';

class SurveyFormService extends WebService {
  constructor() {
    super();
  }

  findAndSave(id, callback) {
    this.get(endpointHelper.detailEndpoint('survey_forms', id))
      .then(response => JSON.parse(response.data))
      .then(data => {
        Form.upsert({...data, type: 'survey'}, DeviceInfo.getVersion())
        questionService.downloadAudioCollection(data.questions, callback);
      })
      .catch(error => console.log('survey form error = ', error))
  }
}

export default SurveyFormService;