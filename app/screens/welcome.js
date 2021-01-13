import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator
} from 'react-native';

import { Icon } from 'react-native-material-ui';
import { Color, Style } from '../assets/stylesheets/base_style';
import ButtonNav from '../components/button_nav';
import { addStatistic } from '../utils/statistic';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Thumbnail from '../components/thumbnail';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';
import LoadingIndicator from '../components/loading_indicator';
import { getVideoId } from '../utils/youtube';

export default class Welcome extends React.Component {
  state = {
    loading: true,
    activeSlide: 0
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

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderButtonNavs() {
    let list = [
      { title: 'Register', iconName: 'person', audioFileName: 'register', routeName: 'RegisterScreen', active: true },
      { title: 'Continue as guest', iconName: 'phone', audioFileName: 'contact_1280', routeName: 'HomeScreen', active: false },
    ];

    let doms = list.map((item, index) => (
      <ButtonNav
        key={index}
        active={item.active}
        title={item.title}
        icon={item.iconName}
        audioFileName={item.audioFileName}
        onPress={() => this._goTo(item.routeName)}
        activePlaying={this.state.activePlaying}
        onPressPlaySound={(fileName) => this.setState({ activePlaying: fileName })}
      />
    ));

    return (
      <View style={{ marginTop: 30 }}>
        {doms}
      </View>
    )
  }

  _renderNoInternetConnection() {
    return (
      <View style={styles.noInternetView}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='info-outline' color='#111' size={24} style={{ marginRight: 8 }} iconSet='MaterialIcons' />
          <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។</Text>
        </View>
        <Text>សូមព្យាយាម​ម្តង​ទៀត​</Text>

        { this.state.showLoading && <ActivityIndicator size="small" />}

        <View style={{ marginTop: 20 }}>
          <Button title='ព្យាយាមម្តងទៀត' onPress={() => this._retryConnection()} />
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
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideSubTitle} numberOfLines={2} >{item.sub_title}</Text>
        </View>
      </View>
    );
  }

  _renderHeaderSlide() {
    let data = [
      {
        title: "Welcome to",
        sub_title: "My journey app is help user for find usful information about migration.",
        imgUrl: require('../assets/images/icons/travel.png'),
        videoUrl: "https://www.youtube.com/watch?v=ttSsAGmpC_U",
      },
      {
        title: "Welcome to",
        sub_title: "My journey app is help user for find usful information about migration.",
        imgUrl: require('../assets/images/icons/travel.png'),
        videoUrl: "https://www.youtube.com/watch?v=Lsd-wDnQC1o",
      },
      {
        title: "Welcome to",
        sub_title: "My journey app is help user for find usful information about migration.",
        imgUrl: require('../assets/images/icons/travel.png'),
        videoUrl: "https://www.youtube.com/watch?v=0CVF4Om6KT4",
      },
    ];

    return (
      <View>
        <Carousel
          loop={true}
          data={data}
          firstItem={this.state.activeSlide}
          ref={(c) => { this._carousel = c; }}
          renderItem={this._renderSlideItem}
          onSnapToItem={index => this.setState({ activeSlide: index })}
          sliderWidth={wp('100%')}
          itemWidth={wp('100%')}
          useScrollView
        />
        <Pagination
          dotsLength={data.length}
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
        {this._renderHeaderSlide()}
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
        {!this.state.loading && !this.state.isConnected ? this._renderNoInternetConnection() : this._renderBodyContent()}
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
    fontWeight: '700'
  },
  slideSubTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Color.primary,
  }
});
