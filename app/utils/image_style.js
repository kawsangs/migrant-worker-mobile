import {
  Dimensions,
} from 'react-native';

const win = Dimensions.get('window');

export const autoImageWidth = function(containerHeight, imageWidth, imageHeight) {
  containerHeight =  parseInt(containerHeight) || win.height;

  let ratio = containerHeight / parseInt(imageHeight);

  return {
    width: parseInt(imageWidth) * ratio,
    height: containerWdith
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
