import React from 'react';
import {
  View,
  Image
} from 'react-native';
import countryHelper from '../helpers/country_helper';

class CountryImage extends React.Component {
  _renderCountryImage() {
    const countryImage = countryHelper.getCountryImage(this.props.countryCode);

    if (countryImage)
      return (<Image source={countryImage} style={[{width: 28, height: 28, marginHorizontal: 15}, this.props.customStyle]} />);

    return (
      <Image source={require('../assets/images/default_image.png')}
        style={[{width: 28, height: 28, marginHorizontal: 15, borderWidth: 1, borderColor: Color.lightGray, borderRadius: 20}, this.props.customStyle]}
      />
    );
  }

  render() {
    return (
      <View>
        {this._renderCountryImage()}
      </View>
    )
  }
}

export default CountryImage;