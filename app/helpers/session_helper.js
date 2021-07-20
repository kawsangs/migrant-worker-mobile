import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { clearSessionVersion } from '../constants/session_constant';

const sessionHelper = (() => {
  return {
    isNewSession,
  }

  async function isNewSession() {
    const isNewSession = await AsyncStorage.getItem('IS_NEW_SESSION');
    if (DeviceInfo.getVersion() == clearSessionVersion && !isNewSession)
      return false;

    return true;
  }
})();

export default sessionHelper;