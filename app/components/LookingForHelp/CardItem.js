import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import TextHighlight from 'react-native-text-highlighter';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { withTranslation } from 'react-i18next';
import contactHelper from '../../helpers/contact_helper';
import CustomAudioPlayerComponent from '../shared/CustomAudioPlayerComponent';
import Visit from '../../models/Visit';
import ContactIcon from './ContactIcon';

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
              {/* { this._renderLogo(item) } */}

              <View style={styles.institutionNameContainer}>
                <TextHighlight textToHighlight={institutionName} searchWords={[this.props.searchedText]} fontSize={15} fontFamily={FontFamily.title} />
              </View>

              { !!item.audio && this.renderAudioPlayer(item)}
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

  callOrOpenLink(url) {
    Visit.uploadFindHelpDetailVisit('Institution', this.props.institute.id);
    Linking.canOpenURL(url).then(supported => {
      if (supported)
        Linking.openURL(url);
      else
        alert(`មិនអាចបើកតំណនេះ`);
    });
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
        onPress={() => this.callOrOpenLink(contactHelper.getContactLink(contactInfo.type, contactInfo.value))}
      >
        <ContactIcon type={contactInfo.type} />

        <Text style={[styles.contact, contactInfo.type.toLowerCase() == 'phone' && {fontWeight: '700', fontSize: FontSize.body}]}>
          { contactInfo.type.toLowerCase() == 'phone' || contactInfo.type.toLowerCase() == 'website' ?
            contactInfo.value
            :
            institutionName
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
    fontFamily: FontFamily.title,
    fontSize: FontSize.small,
    flex: 1
  }
});

export default withTranslation()(CardItem);
