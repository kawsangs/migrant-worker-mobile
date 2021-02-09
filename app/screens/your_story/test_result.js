import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import { Toolbar } from 'react-native-material-ui';
import ProgressCircle from 'react-native-progress-circle';


export default class TestResult extends React.Component {
  state = {
    progress: this.props.route.params.total_weight
  };

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'close'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        // centerElement={'Create your story'}
        // rightElement={'home'}
        // onRightElementPress={() => this._goTo('HomeScreen')}
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
            backgroundColor: Color.pink,
            elevation: 0,
          },
        }}
      />
    );
  }

  _renderContent() {
    let progress_bar_color = this.state.progress < 25 ? Color.red : this.state.progress < 50 ? Color.yellow : '#0bc763';
    return (
      <View style={{ flex: 1, paddingHorizontal: 30 }}>
        <View style={{ alignItems: 'center' }}>
          <View>
            <View style={[styles.coverTickIcon, {
              backgroundColor: progress_bar_color,
            }]}>
              <Image source={Images.tick} style={styles.tickIcon} />
            </View>
            <ProgressCircle
              percent={this.state.progress}
              radius={65}
              borderWidth={13}
              color={progress_bar_color}
              shadowColor="#e4e6e9"
              bgColor={Color.pink}
              containerStyle={{ transform: [{ rotate: '50deg' }] }}
              outerCircleStyle={{ transform: [{ rotate: '-50deg' }] }}
            >
              <Text style={{ fontSize: 28, fontWeight: '700', color: Color.white }}>{`${this.state.progress}%`}</Text>
            </ProgressCircle>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.textTitle}>Congratulation</Text>
          <Text style={{ color: Color.white, textAlign: 'center' }}>Your percentage of your safety migration.</Text>
        </View>
        <View style={styles.borderStyle} />
        <View style={{ alignItems: 'center' }}>
          <Text style={[styles.textTitle, { marginBottom: 16 }]}>Advice for your result</Text>
          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIcon}>
              <Image source={Images.user} style={{ width: 35, height: 35, tintColor: Color.pink }} />
            </View>
            <View>
              <Text style={{ color: Color.white }}>If you have to leave early</Text>
            </View>
          </View>
          <View style={styles.bottomItem}>
            <View style={styles.bottomItemIcon}>
              <Image source={Images.user} style={{ width: 35, height: 35, tintColor: Color.pink }} />
            </View>
            <View>
              <Text style={{ color: Color.white }}>If you have to leave early</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

  _renderDoneButton() {
    return (
      <View style={[Style.boxShadow, styles.doneButton]}>
        <TouchableOpacity
          onPress={() => this._goTo('HomeScreen')}
          style={styles.doneBtnAction}
          activeOpacity={0.8}
        >
          <View style={{ width: 58 }} />
          <View style={styles.coverDoneText}>
            <Text style={styles.doneText}>Done</Text>
          </View>
          <PlaySound
            fileName={'register'}
            buttonAudioStyle={{ backgroundColor: Color.pink }}
            iconStyle={{ tintColor: Color.white }}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({ activePlaying: fileName })}
            style={{ marginHorizontal: 10 }}
          />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Color.pink }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />
        {this._renderToolbar()}
        <View style={[Style.container, { flex: 1 }]}>
          {this._renderContent()}
          {this._renderDoneButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  doneButton: {
    paddingVertical: 10,
  },
  doneBtnAction: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    flexDirection: 'row'
  },
  coverDoneText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneText: {
    color: Color.pink,
    fontFamily: FontFamily.title,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  coverTickIcon: {
    width: 30,
    height: 30,
    position: 'absolute',
    zIndex: 1,
    left: 5,
    top: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  tickIcon: { width: 15, height: 15, tintColor: Color.white },
  textTitle: {
    fontSize: 20,
    color: Color.white,
    marginVertical: 10
  },
  borderStyle: {
    width: '100%',
    height: 3,
    backgroundColor: '#b2355a',
    marginVertical: 20
  },
  bottomItem: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
    alignItems: 'center',
  },
  bottomItemIcon: {
    padding: 15,
    backgroundColor: Color.white,
    borderRadius: 40,
    marginRight: 15
  }
});
