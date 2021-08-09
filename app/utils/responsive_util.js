import { Dimensions } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { smallMobileHeight, smallWidthMobile } from '../constants/screen_size_constant';

const screenHeight = Dimensions.get('screen').height;
const screenWidth = Dimensions.get('screen').width;
const isTablet = DeviceInfo.isTablet();

const getDeviceStyle = (tabletStyle, mobileStyle) => {
  return isTablet ? tabletStyle : mobileStyle;
}

const isShortScreenDevice = () => {
  return screenHeight <= smallMobileHeight;
}

const isShortWidthScreen = () => {
  return screenWidth <= smallWidthMobile;
}

export { getDeviceStyle, isShortScreenDevice, isShortWidthScreen };