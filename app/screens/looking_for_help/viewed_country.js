import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextHighlight from 'react-native-text-highlighter';

import Flag from '../../components/LookingForHelp/Flag';
import CountryImage from '../../components/CountryImage';
import countryHelper from '../../helpers/country_helper';
import Visit from '../../models/Visit';
import { FontFamily } from '../../assets/stylesheets/base_style';

class ViewedCountry extends React.Component {
  gotoHelp = () => {
    let { navigation, country } = this.props

    Visit.uploadFindHelpDetailVisit('Country', country.id)
    navigation.navigate('LookingForHelpScreen', { code: country.code })
  }

  render() {
    let { country } = this.props
    return (
      <TouchableOpacity
        onPress={() => this.gotoHelp()}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        { !countryHelper.isAllCountries(country.name) ?
          <CountryImage countryCode={country.code} />
          :
          <View style={{marginLeft: 16}}/>
        }
        <TextHighlight textToHighlight={country.name_km || country.name} searchWords={[this.props.searchedText]}
          fontSize={16} fontFamily={FontFamily.body}
          containerStyle={{marginVertical: 16}}
        />
      </TouchableOpacity>
    )
  }
}

export default ViewedCountry
