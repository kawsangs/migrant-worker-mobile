import analytics from '@react-native-firebase/analytics';

export const addStatistic = function(event, property={}) {
  analytics().logEvent(event, property);
}
