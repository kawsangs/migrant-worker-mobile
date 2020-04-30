import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import ButtonNav from '../components/button_nav';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import ProfileCard from '../components/profile_card';
import realm from '../schemas/schema';

export default class ProfileList extends React.Component {
  state = {};

  _goToRegisterScreen() {
    this.props.navigation.reset({
      index: 1,
      routes: [{ name: 'HomeScreen' }, { name: 'RegisterScreen' }],
    });
  }

  _renderButtonNav() {
    return (
      <ButtonNav
        title='ចុះឈ្មោះ'
        icon='person'
        audioFileName='register'
        onPress={() => this._goToRegisterScreen()}
        activePlaying={this.state.activePlaying}
        onPressPlaySound={(fileName) => this.setState({activePlaying: fileName})}
      />
    )
  }

  _renderProfileList() {
    let users = realm.objects('User');
    let list = [];

    for(let i=0; i<users.length; i++) {
      list.push(<ProfileCard key={i} user={users[i]} />);
    }

    return (
      <View style={{marginTop: 16}}>
        { list }
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={Style.container}>
          { this._renderButtonNav() }

          <Text>ប្រវត្តិ</Text>

          { this._renderProfileList() }
        </View>
      </ScrollView>
    );
  }
}
