import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, Style, FontFamily } from '../assets/stylesheets/base_style';
import ButtonNav from '../components/button_nav';
import { addStatistic } from '../utils/statistic';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Thumbnail from '../components/thumbnail';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';
import LoadingIndicator from '../components/loading_indicator';

import { getVideoId } from '../utils/youtube';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';

import User from '../models/User';
import uuidv4 from '../utils/uuidv4';
import welcomeVideoList from '../db/json/welcome_videos';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';

class Welcome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      activeSlide: 0
    };
  }

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

  _loginAsGuest() {
    let uuid = uuidv4();
    User.upsert({uuid: uuid, name: "Guest", created_at: new Date()});
    this.props.setCurrentUser(User.find(uuid));
  }

  _renderButtonNavs() {
    return (
      <View style={{ marginTop: 30 }}>
        <ButtonNav
          active={true}
          title={"ចុះឈ្មោះ"}
          icon={"person"}
          audio={'register.mp3'}
          onPress={() => this.props.navigation.navigate("RegisterScreen", {action: 'register'})}
          activePlaying={this.state.activePlaying}
          onPressPlaySound={(fileName) => this.setState({ activePlaying: fileName })}
        />

        <ButtonNav
          title={"បន្តចូលមើល ជាភ្ញៀវ"}
          icon={"accessibility"}
          audio={""}
          onPress={() => this._loginAsGuest()}
          activePlaying={this.state.activePlaying}
          onPressPlaySound={(fileName) => this.setState({ activePlaying: fileName })}
        />
      </View>
    )
  }

  _onPressItem(video) {
    if (!this.state.isConnected) {
      return this.refs.toast.show('សូមភ្ជាប់បណ្តាញអ៊ិនធឺណេតជាមុនសិន!', DURATION.SHORT);
    }

    addStatistic('ViewVideo', { videoId: getVideoId(video.videoUrl), title: video.title });
    this.props.navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.videoUrl) });
  }

  _renderSlideItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1 }} key={index}>
        <Thumbnail
          onPress={() => this._onPressItem(item)}
          imageWidth={wp('100%')}
          imageHeight={300}
          url={item.videoUrl}
        />
        <View style={styles.slideDescription}>
          <Text style={styles.slideTitle}>{item[`title_${i18n.language}`]}</Text>
          <Text style={styles.slideSubTitle} numberOfLines={3} >{item[`sub_title_${i18n.language}`]}</Text>
        </View>
      </View>
    );
  }

  _renderHeaderSlide() {
    return (
      <View>
        <Carousel
          loop={true}
          data={welcomeVideoList}
          firstItem={this.state.activeSlide}
          ref={(c) => { this._carousel = c; }}
          renderItem={this._renderSlideItem}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          sliderWidth={wp('100%')}
          itemWidth={wp('100%')}
          useScrollView
        />
        <Pagination
          dotsLength={welcomeVideoList.length > 1}
          activeDotIndex={this.state.activeSlide}
          containerStyle={{ paddingVertical: 10 }}
          dotStyle={styles.dotStyle}
          inactiveDotStyle={{ backgroundColor: Color.lightGray }}
          inactiveDotOpacity={1}
          inactiveDotScale={1}
        />
      </View>
    )
  }

  _renderBodyContent() {
    return (
      <View>
        { this._renderHeaderSlide() }

        <View style={Style.container}>
          {this._renderButtonNavs()}
        </View>

        {
          this.state.loading &&
          <View style={styles.loadingWrapper}>
            <LoadingIndicator loading={true} />
          </View>
        }
        <Toast ref='toast' position='top' positionValue={Platform.OS == 'ios' ? 120 : 140} />
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        { this._renderBodyContent() }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  noInternetView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideDescription: {
    marginVertical: 20,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideTitle: {
    fontSize: 25,
    fontFamily: FontFamily.title
  },
  slideSubTitle: {
    fontSize: 17,
    textAlign: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.primary,
  }
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(Welcome));
