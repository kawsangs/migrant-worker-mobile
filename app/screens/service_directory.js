import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import { ThemeContext, getTheme } from 'react-native-material-ui';
import { StatusBar } from 'react-native';


export default class ServiceDirectory extends React.Component {
  state = {};

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    return (
      <Text>ServiceDirectory</Text>
    );
  }
}