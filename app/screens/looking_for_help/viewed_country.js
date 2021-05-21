import React from 'react';
import { TouchableOpacity,
Text, StyleSheet } from 'react-native';

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
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        {/* <Image
            source={country.flag}
            style={{ marginHorizontal: 15, width: 30, height: 30, borderRadius: 15, marginRight: 10 }} /> */}
        <Text style={{ marginHorizontal: 15 }}>{country.emoji_flag}</Text>
        <Text style={ styles.my }>{country.name}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  my: {
    marginTop: 16,
    marginBottom: 16
  },
})

export default ViewedCountry
