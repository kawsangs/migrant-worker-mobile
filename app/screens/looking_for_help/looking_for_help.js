import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
  RefreshControl,
  FlatList
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import { getVideoId } from '../../utils/youtube';
import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-easy-toast';
import { Icon, Toolbar } from 'react-native-material-ui';
import LoadingIndicator from '../../components/loading_indicator';
import { addStatistic } from '../../utils/statistic';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import ContactsList from '../../data/json/service_directories';
import { withTranslation } from 'react-i18next';
import EmptyResult from './empty_result';
import Country from '../../models/Country';
import InstitutionService from '../../services/institution_service'

import * as mapping from './mapping'

class LookingForHelp extends React.Component {
  state = {
    country: {},
    institutions: [],
    query: "",
    loading: true,
    isFetching: false,
    isConnected: false
  };

  componentDidMount() {
    this.loadInstitutions()
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected, loading: false });
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  loadInstitutions() {
    const { id } = this.props.route.params
    const country = Country.find(id);

    this.setState({ country, 
                    institutions: country.institutions })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  _renderNoInternetConnection() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='info-outline' color='#111' size={24} style={{ marginRight: 8 }} iconSet='MaterialIcons' />
          <Text>{this.props.t('InternetConnection.NoInternetConnection')}</Text>
        </View>
        <Text>{this.props.t('InternetConnection.PleaseRetry')}</Text>

        { this.state.showLoading && <ActivityIndicator size="small" />}

        <View style={{ marginTop: 20 }}>
          <Button title={this.props.t('InternetConnection.PleaseRetry')} onPress={() => this._retryConnection()} />
        </View>
      </View>
    )
  }

  _retryConnection() {
    this.setState({ showLoading: true })

    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected, showLoading: false });
    });
  }

  _onPressItem(video) {
    if (!this.state.isConnected) {
      return this.refs.toast.show(this.props.t('InternetConnection.PleaseCheckYourInternetConnection'), DURATION.SHORT);
    }

    addStatistic('ViewVideo', { videoId: getVideoId(video.url), title: video.title });
    this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url) });
  }

  onChangeQuery = (query) => {
    const { country } = this.state

    this.setState({ 
      query, 
      institutions: country.institutions.filter( institution => {
        return institution.name.indexOf(query) != -1
      }) })
  }

  renderBackgroundImage() {
    return (
      <View style={{ marginBottom: 16, padding:0 }}>
        <ImageBackground
          source={require('../../../app/assets/images/icons/need_for_help.png')}
          style={styles.backgroundImage}
          imageStyle={{ resizeMode: "contain" }}>

          <View style={styles.searchContainer}>
            <TouchableOpacity>
              <Icon name="search" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
            <TextInput 
              onChangeText={this.onChangeQuery}
              value={this.state.query}
              placeholder={this.props.t("LookingForHelpScreen.FindHelp")}
              style={styles.searchInput} />
          </View>
        </ImageBackground>
      </View>
    )
  }

  _renderItem() {
    const { country, institutions } = this.state

    return (
      <View>
        { this.renderBackgroundImage() }
        { this.header(country) }
        { !institutions.length && <EmptyResult message={this.props.t("LookingForHelpScreen.NotFound")} /> }
      </View>
    )
  }

  header(country) {
    return (
    <View style={styles.countryContainer}>
      <View style={styles.flag}>
        <Text>{country.emoji_flag}</Text>
      </View>
      <Text style={{fontFamily: FontFamily.title}}>{country.name}</Text>
    </View>
    )
  }

  _renderCardBody(item) {
    let list_phone_number = item.contacts || [];
    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={styles.institutionContainer}>
          <TouchableOpacity
            key={item.id}
            // onPress={() => this._onPress(item)}
            activeOpacity={0.8}
            style={[Style.card, {flex: 1}]}
          >
            <View style={{flex: 1}}>
              <View style={styles.institutionImageContainer}>
                <Image 
                  source={item.logoSource}
                  style={{width: 48, height: 48}}/>
              </View>

              <View style={styles.institutionNameContainer}>
                <Text style={{fontWeight: '700'}}>{item.name}</Text>

                {
                  item.audio_url &&
                  <PlaySound
                    fileName={item.audio_url.split('.')[0]}
                    buttonAudioStyle={{backgroundColor: Color.yellow}}
                    iconStyle={{tintColor: Color.white}}
                    activePlaying={this.state.activePlaying}
                    onPress={(fileName) => this.setState({ activePlaying: fileName })}
                  // style={{ marginTop: 10, marginRight: 10 }}
                  />
                }
                
              </View>
            </View>
            <View style={{flex: 1}}>
              {list_phone_number && list_phone_number.map((item, index) => {
                const is_last_item = (index == list_phone_number.length - 1) ? true : false;
                return this._renderContacts(item, index, is_last_item)
              })}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  _renderContacts(item, index, is_last_item) {
    return (
      <View style={[
        styles.contactContainer,
        { borderBottomWidth: is_last_item ? 0 : 1, }]} key={index}>
        <Icon iconSet="FontAwesome"
              name={item.type.toLowerCase()}
              size={24}
              color={mapping.colors[item.type]} />

        <Text style={styles.contact}>
          {item.value}
        </Text>
      </View>
    )
  }

  _onChangeText(val) {
    if (!val) {
      this._onRefresh();
    }

    if (val.length > 1) {
      let list = ContactsList.filter((contact) => {
        return contact.country.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      this.setState({ contacts: list });
    }
  }

  _onRefresh() {
    this.setState({ contacts: ContactsList });
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={this.props.t('LookingForHelpScreen.HeaderTitle')}
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

  _renderHeaderComponent() {
    return (
      <View style={{ borderWidth: 1 }}>
        <ImageBackground
          source={{ uri: "https://reactjs.org/logo-og.png" }}
          style={{ width: '100%', height: 150, }}>
          <View style={{ backgroundColor: Color.white, margin: 16, flex: 1 }}>
            <Text>Header</Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            // onChangeText={this._onChangeText.bind(this)}
            // value={'value'}
            />
          </View>
        </ImageBackground>
      </View>
    )
  }

  pullToReload() {
    this.setState({isFetching: true});
    this.checkInternet(async () => {
      let updatedCount = await InstitutionService.fetch(this.state.country.id)
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
          bodyHeader={this._renderItem()}
          options={{
            header: this._renderToolbar(),
            bodyContentType: 'FlatList',
            bodyContentProps: {
              // contentContainerStyle: styles.flatList,
              data: this.state.institutions,
              renderItem: ({ item }) => this._renderCardBody(item),
              keyExtractor: item => item.id,
              // ListHeaderComponent: () => this._renderHeaderComponent()
            },
            noResultContent: !this.state.loading && !this.state.isConnected && this._renderNoInternetConnection()
          }}
        /> */}

        <FlatList 
          data={this.state.institutions}
          ListHeaderComponent={ this._renderItem() }
          ListHeaderComponentStyle={{ marginVertical: 0 }}
          renderItem={({ item }) => this._renderCardBody(item)}
          keyExtractor={item => item.id}
          // contentContainerStyle={{padding: 8, alignSelf: 'stretch'}}
          numColumns={1}
          onRefresh={ () => this.pullToReload() }
          refreshing={ this.state.isFetching }
        />

        { this.state.loading &&
          <View style={styles.loadingWrapper}>
            <LoadingIndicator loading={true} />
          </View>
        }

        <Toast ref={(toast) => this.toast = toast} 
                positionValue={Platform.OS == 'ios' ? 120 : 140} />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  flatList: {},
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 10,
    marginBottom: 12
  },
  loadingWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1
  },
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
    fontWeight: 'bold',
    fontSize: 16,
    width: '90%'
  },
  countryContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    marginVertical: 0,
    alignItems: 'center',
    marginBottom: 16
  },
  flag: {
    ...Style.card,
    borderRadius: 50,
    padding: 10,
    marginRight: 16,
    marginBottom: 0,
    backgroundColor: '#fff'
  },
  institutionContainer: {
    flexDirection: 'row',
    marginVertical: 0,
    alignItems: 'center',
  },
  institutionImageContainer: {
    flex: 1,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  institutionNameContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  contactContainer: {
    flexDirection: 'row',
    borderBottomColor: Color.border,
    alignItems: 'center',
    paddingVertical: 10
  },
  contact: {
    color: Color.yellow,
    marginLeft: 15,
    fontWeight: '700'
  }
});

export default withTranslation()(LookingForHelp);
