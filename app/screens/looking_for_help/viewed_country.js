import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import Flag from '../../components/LookingForHelp/Flag';

class ViewedCountry extends React.Component {
  gotoHelp = () => {
    let { navigation, country } = this.props

    navigation.navigate('LookingForHelpScreen', { id: country.id })
  }

  render() {
    let { country } = this.props
    return (
      <TouchableOpacity
        onPress={() => this.gotoHelp()}
        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

        <Flag country={country} style={{marginLeft: 16}}/>
        <Text style={{marginVertical: 16}}>{country.name}</Text>
      </TouchableOpacity>
    )
  }
}

export default ViewedCountry
