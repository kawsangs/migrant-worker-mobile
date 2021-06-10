import analytics from '@react-native-firebase/analytics';

export const addStatistic = function(event, property={}) {
  let eventName = event.replace(/\s/g, '').replace(/[^a-zA-Z ]/g, "").slice(0, 40);
  analytics().logEvent(eventName, property);
}
