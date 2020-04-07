import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { Button, Icon } from 'react-native-material-ui';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  goTo(screenName) {
    this.props.navigation.navigate(screenName);
  }

  _button(title, icon, screenName, audio) {
    return (
      <View style={{flexDirection: 'row', marginBottom: 16}}>
        <TouchableOpacity
          onPress={() => this.goTo(screenName)}
          style={{flexDirection: 'row', flex: 1, padding: 16,marginRight: 10, backgroundColor: '#fff', borderRadius: 10}}
        >
          <Icon name={icon} size={24} />
          <Text style={{marginLeft: 10}}>{title}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {alert(1)}}
          style={{backgroundColor: '#fff', borderRadius: 10, padding: 14, flexDirection: 'row', alignItems: 'center'}}
        >
          <View style={{backgroundColor: 'blue', borderRadius: 15, width: 30, height: 30, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="volume-up" color='#fff' size={24} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  _btnAbout() {
    return (
      <TouchableOpacity
        onPress={() => this.goTo('AboutScreen')}
        style={{flexDirection: 'row', flex: 1, padding: 16,marginRight: 10, justifyContent: 'center'}}
      >
        <Icon name='info' size={24} />
        <Text style={{marginLeft: 10}}>អំពីកម្មវិធី</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{height: 180, backgroundColor: '#e2561f'}}>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>ចំណាកស្រុកឆ្លាតវៃ</Text>

          <Text>កម្មវិធីចំណាកស្រុកឆ្លាតវៃ</Text>
          <Text>ជាកម្មវិធីទូរស័ព្ទបង្កើតឡើងក្នុងគោលបំណងជំនួយ</Text>

          <View style={{marginTop: 30}}>
            { this._button('ចំណាកស្រុកឆ្លាតវៃ', 'info-outline', 'OtherInfoScreen') }
            { this._button('ទាក់ទងទៅលេខ ១២៨០', 'phone', 'ChcScreen') }
            { this._button('ចុះឈ្មោះ', 'person', 'RegisterScreen') }

            { this._btnAbout() }
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    flexDirection: 'column'
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },

});
