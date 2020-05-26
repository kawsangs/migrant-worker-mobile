import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, Text, TouchableOpacity, Linking } from 'react-native';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-material-ui';
import listData from '../data/json/service_directories';
import uuidv4 from '../utils/uuidv4';
import { addStatistic } from '../utils/statistic';
import Readmore from '../components/readmore';
import PlaySound from '../components/play_sound';

const onPress = (contactName, phoneNumber) => {
  addStatistic('call_to', {phoneNumber: phoneNumber, contactName: contactName})
  Linking.openURL(`tel:${phoneNumber}`)
}

const renderPhoneList = (contact) => {
  let doms = contact.phones.map ( (phone, index) => (
    <TouchableOpacity
      onPress={() => onPress(contact.name, phone)}
      style={{flexDirection: 'row', paddingBottom: 10, paddingTop: 10, borderBottomWidth: 1, borderColor: Color.border}} key={index}>
      <Icon name='phone' size={24} color={'#111'} />
      <Text style={{marginLeft: 10}}>{phone}</Text>
    </TouchableOpacity>
  ))

  return (doms);
}

const renderCard = (contact) => {
  const [activePlaying, setActivePlaying] = React.useState('');

  return (
    <View
      key={uuidv4()}
      style={Style.card}>

      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, mraginRight: 16, justifyContent: 'center'}}>
          <Text style={{fontFamily: FontFamily.title}}>{contact.name}</Text>
          <Readmore text={contact.descriptions.join('; ')} />

          { renderPhoneList(contact) }

        </View>

        <PlaySound
          style={{paddingLeft: 10}}
          fileName={contact.fileName || 'register'}
          activePlaying={activePlaying}
          onPress={(fileName) => setActivePlaying(fileName)}/>
      </View>
    </View>
  );
}

const CountryRoute = (props) => {
  let country = listData.filter(l => l.countryCode == props.route.key)[0];
  let list = country.list.map((list) => renderCard(list));
  return (
    <ScrollView style={{flex: 1}}>
      <View style={Style.container}>
        <View>
          <Text style={{marginBottom: 16}}>លេខទូរស័ព្ទជួយសង្គ្រោះបន្ទាន់នៅក្នុងប្រទេស{country.country}៖</Text>
          {list}
        </View>
      </View>
    </ScrollView>
  )
};

export default function ServiceDirectory() {
  const [index, setIndex] = React.useState(0);
  const initialLayout = { width: Dimensions.get('window').width };
  const states = listData.map((item) => ({key: item.countryCode, title: `${item.country}`}));
  const [routes] = React.useState(states);

  const scenMap = () => {
    let obj = {};
    for(let i=0; i<states.length; i++) {
      obj[states[i].key] = CountryRoute
    }
    return obj;
  }

  const renderScene = SceneMap(scenMap());

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Color.primary, height: 4 }}
      style={{ backgroundColor: '#fff' }}
      pressColor={'rgba(0,0,0,0.2)'}
      activeColor={Color.primary}
      inactiveColor={'#121212'}
      labelStyle={{fontFamily: FontFamily.title}}
      scrollEnabled={true}
      tabStyle={{width: 'auto'}}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  );
}
