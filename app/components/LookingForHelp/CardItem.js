import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';

import { Color, FontFamily, Style } from '../../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';
import { withTranslation } from 'react-i18next';
import contactHelper from '../../helpers/contact_helper';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';

const mapping = {
  colors: {
    Phone: '#555',
    Facebook: '#3b5998',
    Whatsapp: '#075e54'
  }
}

class CardItem extends React.Component {
  renderAudioPlayer(item) {
    return <CustomAudioPlayerComponent
              itemUuid={`institute_${item.id}`}
              audio={item.audio}
              buttonBackgroundColor={Color.primary}
              isOutline={true}
            />
  }

  render() {
    let item = this.props.institute;
    let list_phone_number = item.contacts || [];
    const institutionName = item.name_km ? item.name_km : item.name;
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
              { this._renderLogo(item) }

              <View style={styles.institutionNameContainer}>
                <Text style={{fontFamily: FontFamily.title, fontSize: 15}}>{institutionName}</Text>
              </View>

              {this.renderAudioPlayer(item)}
            </View>
            <View style={{flex: 1}}>
              {list_phone_number && list_phone_number.map((item, index) => {
                const is_last_item = (index == list_phone_number.length - 1) ? true : false;
                return this._renderContacts(item, index, is_last_item, institutionName)
              })}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  callOrOpenLink(item) {
    Linking.openURL(contactHelper.getContactLink(item.type, item.value));
  }

  _renderLogo(item) {
    if (item.imageSource) {
      return (
        <Image
          source={item.imageSource}
          style={{width: 50, height: 50, borderRadius: 6, marginRight: 10, alignSelf: 'center'}}
          resizeMode='contain'
        />
      )
    }
  }

  _renderContacts(item, index, is_last_item, institutionName) {
    const contactInfo = JSON.parse(item)

    return (
      <TouchableOpacity style={[
        styles.contactContainer,
        { borderBottomWidth: is_last_item ? 0 : 1, }]} key={index}
        onPress={() => this.callOrOpenLink(contactInfo)}  
      >
        <Icon iconSet="FontAwesome"
          name={contactInfo.type.toLowerCase() == 'website' ? 'globe' : contactInfo.type.toLowerCase()}
          size={24}
          color={Color.yellow}
        />

        <Text style={styles.contact}>
          { contactInfo.type.toLowerCase() == 'facebook' ?
            institutionName
            :
            contactInfo.value
          }
        </Text>
      </TouchableOpacity>
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
    paddingVertical: 10
  },
  contact: {
    color: Color.yellow,
    marginLeft: 15,
    fontWeight: '700'
  }
});

export default withTranslation()(CardItem);
