import {
  Dimensions,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { smallMobileHeight, mediumMobileHeight, XXHDPIRatio } from '../constants/screen_size_constant';
import { isSmallScreenDevice } from './responsive_util';

const win = Dimensions.get('window');

export const autoImageWidth = function(containerHeight, imageWidth, imageHeight) {
  containerHeight =  parseInt(containerHeight) || win.height;

  let ratio = containerHeight / parseInt(imageHeight);

  return {
    width: parseInt(imageWidth) * ratio,
    height: containerHeight
  }
}

export const  autoImageHeight = function(containerWdith, imageWidth, imageHeight) {
  containerWdith = parseInt(containerWdith) || win.width;
  let ratio = containerWdith / parseInt(imageWidth);

  return {
    width: containerWdith,
    height: parseInt(imageHeight) * ratio
  }
}

export const backgroundImageTopPosition = function(screenHeight) {
  if (DeviceInfo.isTablet())
    return screenHeight / 7.5;

  if (isSmallScreenDevice())
    return screenHeight / 4.5;

  return screenHeight < mediumMobileHeight ? (screenHeight / 3.6) : (screenHeight / 4.2);
}
