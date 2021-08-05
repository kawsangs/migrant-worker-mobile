import DeviceInfo from 'react-native-device-info';

const isTablet = DeviceInfo.isTablet();

const getDeviceStyle = (tabletStyle, mobileStyle) => {
  return isTablet ? tabletStyle : mobileStyle;
}

export { getDeviceStyle };