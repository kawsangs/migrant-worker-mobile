import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';
import { withTranslation } from 'react-i18next';

import PlaySound from '../play_sound';

const mapping = {
  colors: {
    Phone: '#555',
    Facebook: '#3b5998',
    Whatsapp: '#075e54'
  }
}

class CardItem extends React.Component {
  render() {
    let item = this.props.institute;
    let list_phone_number = item.contacts || [];

    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={styles.institutionContainer}>
          <TouchableOpacity
            key={item.id}
            onPress={() => {}}
            activeOpacity={0.8}
            style={[Style.card, {flex: 1}]}
          >
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={styles.institutionNameContainer}>
                <Text style={{fontFamily: FontFamily.title}}>{item.name}</Text>
              </View>

              <PlaySound
                filePath={item.audio_url}
                buttonAudioStyle={{backgroundColor: Color.red}}
                iconStyle={{tintColor: Color.white}}
              />
            </View>
            <View style={{flex: 1}}>
              {list_phone_number && list_phone_number.map((item, index) => {
                const is_last_item = (index == list_phone_number.length - 1) ? true : false;
                return this._renderContacts(item, index, is_last_item)
              })}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderContacts(item, index, is_last_item) {
    const contactInfo = JSON.parse(item)

    return (
      <View style={[
        styles.contactContainer,
        { borderBottomWidth: is_last_item ? 0 : 1, }]} key={index}>
        <Icon iconSet="FontAwesome"
          name={contactInfo.type.toLowerCase()}
          size={24}
          color={Color.yellow}
          // color={mapping.colors[item.type]}
        />

        <Text style={styles.contact}>
          {contactInfo.value}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  institutionContainer: {
    flexDirection: 'row',
    marginVertical: 0,
    alignItems: 'center',
  },
  institutionNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 10
  },
  contactContainer: {
    flexDirection: 'row',
    borderBottomColor: Color.border,
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 5
  },
  contact: {
    color: Color.yellow,
    marginLeft: 15,
    fontWeight: '700'
  }
});

export default withTranslation()(CardItem);
