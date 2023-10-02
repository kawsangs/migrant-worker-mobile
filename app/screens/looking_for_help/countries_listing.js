import React from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StatusBar,
  View,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { withTranslation } from 'react-i18next';
import EmptyResult from './empty_result'
import ViewedCountry from './viewed_country'
import Country from '../../models/Country'
import Institution from '../../models/Institution';
import NetInfo from "@react-native-community/netinfo";
import CountryService from '../../services/country_service';
import uuidv4 from '../../utils/uuidv4';

const Title = ({ children }) => {
  return (
  <Text style={[styles.my, styles.ml1em]}>
    {children}
  </Text>
  )
}
class CountriesListing extends React.Component {
  state = {
    query: "",
    isFetching: false,
    countries: []
  }

  componentDidMount() {
    Country.seedData(() => {
      Institution.reloadBatch()
    })

    this.loadCountries()
  }

  loadCountries() {
    this.setState({ countries: Country.all() })
  }

  filterData(query) {
    return Country.where('name_km', query)
  }

  onChangeQuery = (query) => {
    this.setState({
      query,
      countries: Country.filterByName(query),
    })
  }

  onSubmit = () => {
    const {query} = this.state;

    this.setState({
      countries: this.filterData(query)
    })
  }

  _renderContent() {
    const { t, navigation } = this.props
    const { query, countries, isFetching } = this.state;
    
    return (
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <Title>{t("CountriesListingScreen.Search")}</Title>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={this.onSubmit}>
            <Icon name="search" style={styles.ml1em} size={24} color={Color.gray} />
          </TouchableOpacity>

          <TextInput
            style={styles.searchControl}
            onChangeText={this.onChangeQuery}
            value={query}
            placeholder={t("CountriesListingScreen.CountrySearch")}
            placeholderStyle={{fontFamily: FontFamily.body}}
            keyboardType="default"
            onSubmitEditing={this.onSubmit}
          />
        </View>

        <Title>
          {t("CountriesListingScreen.Country")}
        </Title>

        <View style={styles.countriesContainer}>
          <FlatList
            data={countries}
            renderItem={(country, i) => <ViewedCountry navigation={navigation} country={country.item} searchedText={this.state.query} /> }
            keyExtractor={country => uuidv4()}
            ListEmptyComponent={<EmptyResult message={t("CountriesListingScreen.NoCountry")} />}
            contentContainerStyle={{padding: 8, alignSelf: 'stretch'}}
            onRefresh={ () => this._onRefresh() }
            refreshing={ isFetching }
          />
        </View>
      </View>
    );
  }

  _onRefresh() {
    this.setState({isFetching: true});
    this.checkInternet(async () => {
      new CountryService().fetch();
      this.setState({isFetching: false});
    })
  }

  checkInternet(callback) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        alert(this.props.t("InternetConnection.NoInternetConnection"));
        return
      }

      callback();
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />
        { this._renderContent() }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  my: {
    marginTop: 16,
    marginBottom: 16
  },
  ml1em: {
    marginLeft: 16
  },
  countriesContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: "white"
  },
  searchControl: {
    margin: 12,
    flexGrow: 1,
    marginVertical: 5,
    paddingVertical: 10,
    fontFamily: FontFamily.body,
    fontSize: 16,
  },
  searchContainer: {
    display: 'flex',
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    paddingVertical: 0
  }
})

export default withTranslation()(CountriesListing);
