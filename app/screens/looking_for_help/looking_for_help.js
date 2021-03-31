import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Dimensions,
  Button,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
  TextInput,
} from 'react-native';

import Thumbnail from '../../components/thumbnail';
import videoList from '../../data/json/videos';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import { getVideoId } from '../../utils/youtube';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';
import { Icon, Toolbar } from 'react-native-material-ui';
import LoadingIndicator from '../../components/loading_indicator';
import { addStatistic } from '../../utils/statistic';
import CollapsibleNavbar from '../../components/collapsible_navbar';
import ContactsList from '../../data/json/service_directories';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

class LookingForHelp extends React.Component {
  state = {
    contacts: ContactsList,
    loading: true
  };

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({ isConnected: state.isConnected, loading: false });
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });
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

  _renderItem(item) {
    return (
      <View style={{ marginHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', marginVertical: 15, alignItems: 'center', }}>
          <Image
            source={require("../../assets/images/icons/cambodia_flag.png")}
            style={{ width: 30, height: 30, borderRadius: 15, marginRight: 10 }} />
          <Text style={{ fontWeight: '700' }}>{item[`country_${i18n.language}`]}</Text>
        </View>
        {item?.list && item.list.map((item, index) => this._renderCardBody(item, index))}
      </View>
    )
  }

  _renderCardBody(item, index) {
    let list_phone_number = item.phones || [];
    return (
      <TouchableOpacity
        key={index}
        // onPress={() => this._onPress(item)}
        activeOpacity={0.8}
        style={[Style.card, { flex: 1, }]}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={{ fontWeight: '700' }}>{item[`name_${i18n.language}`]}</Text>
          </View>

          <View style={{ marginLeft: 15 }}>
            <PlaySound
              fileName={'register'}
              buttonAudioStyle={{
                backgroundColor: Color.yellow
              }}
              iconStyle={{
                tintColor: Color.white
              }}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({ activePlaying: fileName })}
            // style={{ marginTop: 10, marginRight: 10 }}
            />
          </View>
        </View>
        <View style={{ flex: 1, }}>

          {list_phone_number && list_phone_number.map((item, index) => {

            const is_last_item = (index == list_phone_number.length - 1) ? true : false;

            return this._renderPhones(item, index, is_last_item)
          })}

        </View>
      </TouchableOpacity>
    )
  }

  _renderPhones(item, index, is_last_item) {
    return (
      <View style={{
        flexDirection: 'row',
        borderBottomWidth: is_last_item ? 0 : 1,
        borderBottomColor: Color.border,
        alignItems: 'center',
        paddingVertical: 10
      }} key={index}>
        <Icon name='phone' size={24} color={Color.yellow} />
        <Text style={{ color: Color.yellow, marginLeft: 15, fontWeight: '700' }}>{item}</Text>
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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.yellow} />
        <CollapsibleNavbar
          options={{
            header: this._renderToolbar(),
            bodyContentType: 'FlatList',
            bodyContentProps: {
              // contentContainerStyle: styles.flatList,
              data: this.state.contacts,
              renderItem: ({ item }) => this._renderItem(item),
              keyExtractor: item => item.code,
              // ListHeaderComponent: () => this._renderHeaderComponent()
            },
            noResultContent: !this.state.loading && !this.state.isConnected && this._renderNoInternetConnection()
          }}
        />

        { this.state.loading &&
          <View style={styles.loadingWrapper}>
            <LoadingIndicator loading={true} />
          </View>
        }

        <Toast ref='toast' position='top' positionValue={Platform.OS == 'ios' ? 120 : 140} />
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
  }
});

export default withTranslation()(LookingForHelp);