import React from 'react';
import { SafeAreaView, FlatList, TouchableOpacity, Text, StatusBar, View, TextInput, StyleSheet, Image } from 'react-native';
import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Toast from 'react-native-easy-toast';
import { Toolbar, Icon } from 'react-native-material-ui';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import { withTranslation } from 'react-i18next';
import EmptyResult from './empty_result'
import ViewedCountry from './viewed_country'
import Country from '../../models/Country'
import Institution from '../../models/Institution';
import NetInfo from "@react-native-community/netinfo";
import CountryService from '../../services/country_service';

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
    Country.reloadBatch(() => {
      Institution.reloadBatch()
    })

    this.loadCountries()
  }

  loadCountries() {
    this.setState({ countries: Country.all() })
  }

  filterData(query) {
    return Country.where('name', query)
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t('CountriesListingScreen.HeaderTitle')}
        rightElement={'home'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          centerElementContainer: {
            marginLeft: 0
          },
          container: {
            width: '100%',
            backgroundColor: Color.yellow,
          },
        }}
      />
    );
  }

  onChangeQuery = (query) => {
    this.setState({ query })
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
        <Title>
          {t("CountriesListingScreen.Search")}
        </Title>

        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={this.onSubmit}>
            <Icon name="search" style={styles.ml1em} />
          </TouchableOpacity>

          <TextInput
            style={styles.searchControl}
            onChangeText={this.onChangeQuery}
            value={query}
            placeholder={t("CountriesListingScreen.CountrySearch")}
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
            renderItem={(country, i) => {
              return <ViewedCountry navigation={navigation}
                                    key={i} 
                                    country={country.item} />
            }}
            keyExtractor={country => country.id}
            contentContainerStyle={{padding: 8, alignSelf: 'stretch'}}
            numColumns={1}
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
      let updatedCount = await CountryService.fetch()
      this.toast.show('New counties found ' + JSON.stringify(updatedCount));
      this.setState({isFetching: false});
    })
  }

  checkInternet(callback) {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        this.setState({isFetching: false});
        alert("No internet connection");
        return
      }

      callback();
    });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />
        {/* <CollapsibleNavbar
          options={{
            header: this._renderToolbar(),
            title: 'អំពីកម្មវិធី',
            bodyContent: this._renderContent(),
            style: { margin: 0 }
          }}
        /> */}

        {
          this._renderContent()
        }

        <Toast ref={(toast) => this.toast = toast} 
                positionValue={Platform.OS == 'ios' ? 120 : 140} />
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
    paddingVertical: 0
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
