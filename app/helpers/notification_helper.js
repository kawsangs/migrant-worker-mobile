import Moment from 'moment';
import { getTranslatedDate } from '../utils/datetime';

const notificationHelper = (() => {
  return {
    getReceiveDateTime,
  };

  function getReceiveDateTime(receivedDateTime) {
    if (Moment().diff(receivedDateTime, 'days') == 0)
      return Moment(receivedDateTime).format('hh:mm A');

    return getTranslatedDate(receivedDateTime);
  }
})();

export default notificationHelper;