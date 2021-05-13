import React from 'react';
import { SafeAreaView, Text, StatusBar, View, TextInput, StyleSheet } from 'react-native';
import { Color, FontFamily, } from '../../assets/stylesheets/base_style';
import Toast from 'react-native-easy-toast';
import { Toolbar, Icon } from 'react-native-material-ui';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import { withTranslation } from 'react-i18next';

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

        <Text style={ styles.my }>ស្វែងរក</Text>
        <View style={{
          display: 'flex',
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'stretch'
        }}>
          <Icon name="search" />

          <TextInput
            style={{height: 40,
              margin: 12,
              flexGrow: 1,
              borderWidth: 1,}}
            onChangeText={this.onChangeQuery}
            value={this.state.query}
            placeholder="useless placeholder"
            keyboardType="numeric"
          />
        </View>

        <Text style={ styles.my }>ប្រទេស</Text>

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
