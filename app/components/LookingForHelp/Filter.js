import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import { addStatistic } from '../../utils/statistic';
import { withTranslation } from 'react-i18next';
import CountryInstitution from '../../models/CountryInstitution';
import InstitutionService from '../../services/institution_service';
import institutionHelper from '../../helpers/institution_helper';
import Icon from 'react-native-vector-icons/MaterialIcons';

class LookingForHelp extends React.Component {
  constructor(props) {
    super(props);

    const countryInstitutions = CountryInstitution.findByCountryCode(props.code)

    this.state = {
      institutions: new InstitutionService().getInstitutionByCountry(countryInstitutions),
      query: "",
    };
  }

  onChangeQuery = (query) => {
    this.setState({query: query});
    this.props.onChangeQuery(institutionHelper.getFilteredInstitutions(this.state.institutions, query), query);
  }

  render() {
    return (
      <View style={{ marginBottom: 16, padding:0 }}>
        <ImageBackground
          source={require('../../../app/assets/images/icons/looking_for_help.png')}
          style={styles.backgroundImage}
          imageStyle={{ resizeMode: "contain" }}>

          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Icon name="search" size={24} color={Color.gray} style={{ marginLeft: 15 }} />
            </TouchableOpacity>

            <TextInput
              onChangeText={this.onChangeQuery}
              value={this.state.query}
              placeholder={this.props.t("LookingForHelpScreen.FindHelp")}
              placeholderStyle={{fontFamily: FontFamily.body}}
              style={styles.searchInput} />
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 150,
    backgroundColor: Color.yellow,
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    bottom: 20,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  searchInput: {
    fontFamily: FontFamily.body,
    fontSize: 16,
    width: '90%',
    height: 50
  },
});

export default withTranslation()(LookingForHelp);
