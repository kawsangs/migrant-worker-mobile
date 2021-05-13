import React from 'react';
import { SafeAreaView, TouchableOpacity, Text, StatusBar, View, TextInput, StyleSheet, Image } from 'react-native';
import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Toast from 'react-native-easy-toast';
import { Toolbar, Icon } from 'react-native-material-ui';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import { withTranslation } from 'react-i18next';
import countries from '../../data/json/countries';

class Country extends React.Component {
  gotoHelp = () => {
    let { navigation, country } = this.props

    navigation.navigate('LookingForHelpScreen', { ...country })
  }

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.gotoHelp()}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center'
        }}>
        <Image
            source={require("../../assets/images/icons/cambodia_flag.png")}
            style={{ marginHorizontal: 15, width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />

        <Text style={ styles.my }>{this.props.country.name}</Text>
      </TouchableOpacity>
    )
  }
}

class CountriesListing extends React.Component {
  state = {
    query: ""
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

  _renderContent() {
    return (
      <View style={[{ alignItems: 'flex-start' }]}>

        <Text style={ [styles.my, { marginLeft: 16 }] }>ស្វែងរក</Text>
        <View style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch',
          paddingVertical: 0
        }}>
          <Icon name="search" style={{marginLeft: 15}} />

          <TextInput
            style={{
              margin: 12,
              flexGrow: 1,
              marginVertical: 5,
              paddingVertical: 0,}}
            onChangeText={this.onChangeQuery}
            value={this.state.query}
            placeholder="ស្វែងរកប្រទេសចំណាកស្រុក"
            keyboardType="numeric"
          />
        </View>

        <Text style={ [styles.my, { marginLeft: 16 }] }>ប្រទេស</Text>

        <View style={{
            alignSelf: 'stretch',
            backgroundColor: "white"
          }}>

          {
            countries.map(country => {
              return <Country navigation={this.props.navigation}
                              key={country.id} 
                              country={country} />
            })
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
  }
})

export default withTranslation()(CountriesListing);
