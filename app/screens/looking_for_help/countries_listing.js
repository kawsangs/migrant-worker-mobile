import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, StatusBar, View, TextInput, StyleSheet, Image } from 'react-native';
import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Toast from 'react-native-easy-toast';
import { Toolbar, Icon } from 'react-native-material-ui';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import { withTranslation } from 'react-i18next';
// import countries from '../../data/json/countries';
import axios from 'axios';
import Autocomplete from 'react-native-autocomplete-input';
import EmptyResult from './empty_result'
import ViewedCountry from './viewed_country'
import Country from '../../models/Country'

class CountriesListing extends React.Component {
  state = {
    query: "",
    countries: []
  }

  componentDidMount() {
    Country.deleteAll()
    Country.createCollection()

    // Country.create({ id: 1, name: 'Cambodia' })
    // Country.create({ id: 2, name: 'Australia' })
    // Country.create({ id: 3, name: 'Japan' })

    // alert(Country.all())

    this.loadCountries()
  }

  loadCountries() {
    this.setState({ countries: Country.all() })
  }

  async filterData(query) {
    try {
      if(query=="") return [];

      const response = await axios.get(`http://d94ee5a0fc5a.ngrok.io/api/v1/countries/?query=${query}`, {
        headers: { 'Authorization': 'Bearer 960fc97371f1eaa49961212f8ec78ea8' },
        timeout: 0
      })
      return this.setState({ countries: response.data })
    } catch (error) {
      alert(error)
      return [{ message: 'error', message: error }]
    }
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
    this.setState({ query: query })
  }

  onSubmit = () => {
    const {query} = this.state;

    this.setState({
      countries: this.filterData(query)
    })
  }

  _renderContent() {
    const { query, countries } = this.state;
    // const data = this.filterData(query);
    
    return (
      <View style={[{ alignItems: 'flex-start' }]}>

        <Text style={ [styles.my, { marginLeft: 16 }] }>
          {this.props.t("CountriesListingScreen.Search")}
        </Text>
        <View style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          paddingVertical: 0
        }}>
          <TouchableOpacity
            onPress={this.onSubmit}
            >
            <Icon name="search" style={{marginLeft: 15}} />
          </TouchableOpacity>

          <TextInput
            style={{
              margin: 12,
              flexGrow: 1,
              marginVertical: 5,
              paddingVertical: 0,}}
            onChangeText={this.onChangeQuery}
            value={this.state.query}
            placeholder={this.props.t("CountriesListingScreen.CountrySearch")}
            keyboardType="default"
            onSubmitEditing={this.onSubmit}
          />
        </View>

        {/* <View>
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={countries}
              value={query}
              onChangeText={(text) => this.setState({ query: text })}
              flatListProps={{
                keyExtractor: (_, idx) => idx,
                renderItem: ({ item }) => <Text>{item.name}</Text>,
              }}
              />
          </View>
          <View>
            <Text>Some content</Text>
          </View>
        </View> */}

        <Text style={ [styles.my, { marginLeft: 16 }] }>
          {this.props.t("CountriesListingScreen.Country")}
        </Text>

        <View style={{
            alignSelf: 'stretch',
            backgroundColor: "white"
          }}>

          {
            countries.length > 0 ?
            countries.map(country => {
              return <ViewedCountry navigation={this.props.navigation}
                                    key={country.id} 
                                    country={country} />
            }) : <EmptyResult message={this.props.t("CountriesListingScreen.NoCountry")} />
          }
        </View>
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />
        <CollapsibleNavbar
          options={{
            header: this._renderToolbar(),
            title: 'អំពីកម្មវិធី',
            bodyContent: this._renderContent(),
            style: { margin: 0 }
          }}
        />

        <Toast ref='toast' position='top' positionValue={Platform.OS == 'ios' ? 120 : 140} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  my: {
    marginTop: 16,
    marginBottom: 16
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
})

export default withTranslation()(CountriesListing);
