import Moment from 'moment';
import { getTranslatedDate } from '../utils/datetime';

const notificationHelper = (() => {
  return {
    getReceiveDateTime,
  };

  function getReceiveDateTime(receivedDateTime) {
    const currentDate = Moment().format('DD/MM/YYYY');
    const receivedDate = Moment(receivedDateTime).format('DD/MM/YYYY');

    if (Moment(currentDate).isSame(receivedDate))
      return Moment(receivedDateTime).format('hh:mm A');

    return getTranslatedDate(receivedDateTime);
  }
})();

export default notificationHelper;