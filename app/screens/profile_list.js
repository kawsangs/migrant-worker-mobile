import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import ButtonNav from '../components/button_nav';
import ProfileCard from '../components/profile_card';
import realm from '../schemas/schema';
import CollapsibleNavbar from '../components/collapsible_navbar';

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

  _renderContent() {
    return (
      <View>
        { this._renderButtonNav() }

        <Text>ប្រវត្តិ</Text>

        { this._renderProfileList() }
      </View>
    )
  }

  render() {
    return (
      <CollapsibleNavbar
        options={{
          title: 'ប្រវត្តិចុះឈ្មោះ',
          bodyContent: this._renderContent(),
          headerLeftButton: {
            onPress: () => this.props.navigation.popToTop()
          }
        }}
      />
    );
  }
}
