import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import ButtonNav from '../components/button_nav';
import { addStatistic } from '../utils/statistic';

export default class Home extends React.Component {
  state = {};

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderButtonAbout() {
    return (
      <View style={{flexGrow: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity
          onPress={() => this._goTo('AboutScreen')}
          style={styles.buttonAboutWrapper}
        >
          <Icon name='info' size={24} />
          <Text style={{marginLeft: 10}}>អំពីកម្មវិធី</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderHeader() {
    return (
      <View style={styles.imageWrapper}>
        <Image style={{width: 301, height: 198}} source={require('../assets/images/icons/travel.png')} />
      </View>
    )
  }

  _renderButtonNavs() {
    let list = [
      { title: 'ចំណាកស្រុកសុវត្ថិភាព', iconName: 'info-outline', audioFileName: 'safe_migration', routeName: 'OtherInfoScreen', active: true },
      { title: 'ទាក់ទងទៅលេខ១២៨០', iconName: 'phone', audioFileName: 'contact_1280', routeName: 'Contact1280Screen', active: false },
      { title: 'ចុះឈ្មោះ', iconName: 'person', audioFileName: 'register', routeName: 'RegisterScreen', active: false },
    ];

    let doms = list.map((item, index) => (
      <ButtonNav
        key={index}
        active={item.active}
        title={item.title}
        icon={item.iconName}
        audioFileName={item.audioFileName}
        onPress={() => this._goTo(item.routeName)}
        activePlaying={this.state.activePlaying}
        onPressPlaySound={(fileName) => this.setState({activePlaying: fileName})}
      />
    ));

    return (
      <View style={{marginTop: 30}}>
        {doms}
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
        { this._renderHeader() }

        <View style={Style.container}>
          <Text style={styles.title}>ចំណាកស្រុកសុវត្ថិភាព</Text>
          <Text>កម្មវិធីចំណាកស្រុកសុវត្ថិភាព</Text>
          <Text>ជាកម្មវិធីទូរស័ព្ទបង្កើតឡើងក្នុងគោលបំណងជំនួយ</Text>
          { this._renderButtonNavs() }
        </View>

        { this._renderButtonAbout() }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  imageWrapper: {
    height: 196,
    backgroundColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    fontFamily: FontFamily.title,
    fontSize: FontSize.title,
    textAlign: 'center',
  },
  buttonAboutWrapper: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'center',
  }
});
