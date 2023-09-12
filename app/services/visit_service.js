import DeviceInfo from 'react-native-device-info';
import WebService from './web_service';
import endpointHelper from '../helpers/endpoint_helper';
import Visit from '../models/Visit';
import User from '../models/User';
import Sidekiq from '../models/Sidekiq';

class VisitService extends WebService {
  async upload(uuid) {
    this.post(endpointHelper.listingEndpoint('visits'), JSON.stringify(await this._buildParams(uuid)), 'application/json')
      .then(res => {
        Sidekiq.destroy(uuid);
        Visit.deleteByUuid(uuid);
      })
  }

  // private method
  async _buildParams(uuid) {
    const visit = Visit.find(uuid);
    const user = User.find(visit.user_uuid);
    return {
      visit: {
        user_id: !!user ? user.id : null,
        user_uuid: visit.user_uuid,
        visit_date: visit.visit_date,
        pageable_id: visit.pageable_id,
        pageable_type: visit.pageable_type,
        device_id: await DeviceInfo.getUniqueId(),
        page_attributes: {
          code: visit.code,
          name: visit.name,
          parent_code: visit.parent_code
        }
      }
    }
  }
}

export default VisitService;