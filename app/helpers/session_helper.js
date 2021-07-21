import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import { clearSessionVersion } from '../constants/session_constant';

import Sidekiq from '../models/Sidekiq';
import User from '../models/Sidekiq';
import Quiz from '../models/Quiz';
import Answer from '../models/Answer';

const sessionHelper = (() => {
  return {
    isNewSession,
    removeQuizQueue
  }

  async function isNewSession() {
    const isNewSession = await AsyncStorage.getItem('IS_NEW_SESSION');
    if (DeviceInfo.getVersion() == clearSessionVersion && !isNewSession)
      return false;

    return true;
  }

  function removeQuizQueue() {
    Sidekiq.deleteAll();
    User.deleteAll();
    Quiz.deleteAll();
    Answer.deleteAll();
  }
})();

export default sessionHelper;