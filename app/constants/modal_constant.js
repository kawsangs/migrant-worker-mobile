import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getDeviceStyle, isLowPixelDensityDevice} from '../utils/responsive_util';

const confirmationAndroidMobile = isLowPixelDensityDevice() ? {snapPoints: ['54%'], height: hp('51%')} : {snapPoints: ['48%'], height: hp('46%')}
export const defaultSnapPoints = getDeviceStyle(['41%'], confirmationAndroidMobile.snapPoints);
export const defaultContentHeight = getDeviceStyle(hp('36%'), confirmationAndroidMobile.height);

export const titleMarginLeft = 18