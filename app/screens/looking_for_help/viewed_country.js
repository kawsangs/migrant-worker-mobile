import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import Flag from '../../components/LookingForHelp/Flag';
import CountryImage from '../../components/CountryImage';
import countryHelper from '../../helpers/country_helper';
import Visit from '../../models/Visit';

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
        <Text style={{marginVertical: 16}}>
          { country.name_km || country.name }
        </Text>
      </TouchableOpacity>
    )
  }
}

export default ViewedCountry
