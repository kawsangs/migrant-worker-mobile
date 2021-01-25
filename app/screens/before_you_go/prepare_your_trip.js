import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Icon, Toolbar } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class PrepareYourTrip extends React.Component {
  state = {}

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={'Predeparture list'}
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
            backgroundColor: Color.red,
          },
        }}
      />
    );
  }

  _onPress(item) {
    if (item.routeName == 'ImageViewScreen' ) {
      addStatistic('migration_checklist_view_image', { title: item.title })
    }

    this.props.navigation.navigate(item.screenName, {title: item.title, imageList: item.imageList});
  }

  _renderContent() {
    let list = [
      { title: 'Passport', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'visas', fileName: '', w: 34, h: 45 },
      { title: 'Visa', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'worker_cards', fileName: '', w: 34, h: 45 },
      { title: 'Work Permint', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'passport', fileName: '', w: 34, h: 45 },
      { title: 'Work Permint I', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'passport_preparation', fileName: '', w: 34, h: 45 },
      { title: 'Work Permint II', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'thai_working_card', fileName: '', w: 34, h: 45 },
      { title: 'Work Permint III', image: Images.safe_migrant, screenName: 'ImageViewScreen', imageList: 'worker_cards', fileName: '', w: 34, h: 45 },
    ];

    return list.map((item, index) => this._renderCard(item, index));
  }

  _renderCard(item, index) {
    return (
      <TouchableOpacity
        key={index}
        style={Style.card}
        onPress={() => this._onPress(item)}
        activeOpacity={0.8}
      >
        <View style={[Style.cardContent]}>
          <View>
            <View style={styles.cardID}>
              <Text style={styles.cardNumber}>{index + 1}</Text>
            </View>
          </View>

          <View style={styles.cardImage}>
            <Image source={item.image} style={styles.cardImageStyle} />
          </View>

          <View>
            <PlaySound
              fileName={'register'}
              buttonAudioStyle={{
                backgroundColor: Color.red
              }}
              iconStyle={{
                tintColor: Color.white
              }}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({ activePlaying: fileName })}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', }}>
          <Text style={[styles.title]}>{item.title}</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    )
  }

  _renderMainCard() {
    return (
      <View style={[Style.card, { minHeight: 150 }]}>
        <View style={styles.coverImageMainCard}>
          <Image source={Images.safe_migrant} style={styles.cardImageStyle} />
        </View>
        <View style={[Style.cardContent, styles.mainCardContent]}>
          <View style={{ marginRight: 10, paddingHorizontal: 10 }}>
            <Text style={styles.mainCardNumber}>{6}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.mainCardLabel}>Things prepare before departures</Text>
          </View>
          <View style={{ marginLeft: 30 }}>
            <PlaySound
              fileName={'register'}
              buttonAudioStyle={{
                backgroundColor: Color.red
              }}
              iconStyle={{
                tintColor: Color.white
              }}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({ activePlaying: fileName })}
            />
          </View>
        </View>
      </View>
    )
  }

  _renderArrowDown() {
    return (
      <View style={styles.arrowDown}>
        <Image source={Images.down} style={styles.arrowDownImage} />
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this._renderToolbar()}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={[Style.container, { flex: 1, marginBottom: 0 }]}>
            {this._renderMainCard()}
            {this._renderArrowDown()}
            {this._renderContent()}
          </View>
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  cardID: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#fcd4ce",
    overflow: 'hidden',
  },
  cardNumber: {
    fontWeight: '700',
    fontSize: FontSize.title + 15,
    color: Color.red,
    marginBottom: 5
  },
  cardImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImageStyle: {
    width: wp('25'),
    height: wp('25')
  },
  title: {
    flex: 1,
    fontFamily: FontFamily.title,
    color: Color.textBlack,
    fontWeight: '700'
  },
  coverImageMainCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 25,
  },
  mainCardContent: {
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  mainCardNumber: {
    fontWeight: '700',
    fontSize: FontSize.title + 30,
    lineHeight: FontSize.title + 30,
  },
  mainCardLabel: {
    fontSize: FontSize.title - 7,
    fontWeight: '700'
  },
  arrowDown: {
    flex: 1,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowDownImage: {
    width: 30,
    height: 30,
    tintColor: Color.gray
  }
});
