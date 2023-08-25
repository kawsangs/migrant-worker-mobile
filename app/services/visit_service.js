import DeviceInfo from 'react-native-device-info';
import WebService from './web_service';
import endpointHelper from '../helpers/endpoint_helper';

class VisitService extends WebService {
  async create(currentUser, data) {
    const params = await this._buildParams(currentUser, data);
    this.post(endpointHelper.listingEndpoint('visits'), params)
      .then(response => JSON.parse(response.data))
      .then(data => {
        console.log('=== send visit request success = ', data)
      })
      .catch(error => {
        console.log('=== send visit request error = ', error)
      })

    // this.post(endpointHelper.listingEndpoint('visits'), JSON.stringify(params), 'application/json')
  }

  // private method
  async _buildParams(currentUser, data) {
    return {
      visit: {
        user_id: currentUser.uuid,
        visit_date: new Date(),
        pageable_id: data.pageableId,
        pageable_type: data.pageableType,
        device_id: await DeviceInfo.getUniqueId(),
        page_attributes: {
          code: data.code,
          name: data.name,
          parent_code: data.parentCode
        }
      }
    }
  }
}

export default VisitService;