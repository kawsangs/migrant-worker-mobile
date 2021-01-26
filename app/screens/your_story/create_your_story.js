import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Icon, Toolbar } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import PlaySound from '../../components/play_sound';
import Images from '../../utils/images';
import { addStatistic } from '../../utils/statistic';
import ProgressCircle from 'react-native-progress-circle';

export default class CreateYourStory extends React.Component {
  state = {}

  _goTo(screenName) {
    addStatistic(`goTo${screenName.split('Screen')[0]}`);
    this.props.navigation.navigate(screenName);
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={'arrow-back'}
        onLeftElementPress={() => this.props.navigation.goBack()}
        centerElement={'Create your story'}
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
            backgroundColor: Color.pink,
            elevation: 0,
          },
        }}
      />
    );
  }

  _onPress(item) {
    if (item.routeName == 'ImageViewScreen') {
      addStatistic('migration_checklist_view_image', { title: item.title })
    }

    this.props.navigation.navigate(item.screenName, { title: item.title, imageList: item.imageList });
  }

  _renderContent() {
    let list = [
      { title: '1st Story', subTitle: '6 questions', screenName: 'AboutScreen', fileName: '', },
      { title: '2nd Story', subTitle: '6 questions', screenName: 'AboutScreen', fileName: '', },
      { title: '3rd Story', subTitle: '6 questions', screenName: 'AboutScreen', fileName: '', },
    ];

    return <View style={Style.container}>
      <View style={{ marginBottom: 16 }}>
        <Text style={styles.testStoryTitle}>Test your story</Text>
      </View>
      {list.map((item, index) => {
        const is_last_item = (index !== list.length - 1) ? true : false;
        return this._renderCard(item, index, is_last_item)
      })}
    </View>;
  }

  _renderCard(item, index, last_item) {
    return (
      <View>
        <TouchableOpacity
          key={index}
          style={[Style.card, { marginBottom: 10, padding: 15 }]}
          onPress={() => this._onPress(item)}
          activeOpacity={0.8}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardIcon}>
              <Image source={Images.folder} style={styles.cardFolder} />
            </View>

            <View style={styles.cardDescription}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubTitle}>{item.subTitle}</Text>
            </View>

            <View>
              <PlaySound
                fileName={'register'}
                buttonAudioStyle={{ backgroundColor: Color.pink }}
                iconStyle={{ tintColor: Color.white }}
                activePlaying={this.state.activePlaying}
                onPress={(fileName) => this.setState({ activePlaying: fileName })}
              />
            </View>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text style={[styles.title]}>Start Test</Text>
            <Icon name='keyboard-arrow-right' size={24} style={{ color: Color.gray }} />
          </View>
        </TouchableOpacity>
        {
          !last_item ? null : <View style={styles.verticalLine}>
            <Image source={Images.vertical_line} style={[styles.cardFolder, { tintColor: Color.gray }]} />
          </View>
        }
      </View>
    )
  }

  _renderHeader() {
    return (
      <View style={{ backgroundColor: Color.pink }}>
        <View style={[Style.card, styles.cardHeaderContent]}>
          <View>
            <ProgressCircle
              percent={70}
              radius={40}
              borderWidth={10}
              color="#0bc763"
              shadowColor="#e4e6e9"
              bgColor="#fff"
            >
              <Text style={{ fontSize: 18, fontWeight: '700' }}>{'70%'}</Text>
            </ProgressCircle>
          </View>
          <View style={styles.headerCardTitle}>
            <Text style={styles.headerCardMainTitle}>Safety Migration</Text>
            <Text style={styles.headerCardSubTitle}>Percentage number of test</Text>
          </View>
          <View>
            <PlaySound
              fileName={'register'}
              buttonAudioStyle={{ backgroundColor: Color.pink }}
              iconStyle={{ tintColor: Color.white }}
              activePlaying={this.state.activePlaying}
              onPress={(fileName) => this.setState({ activePlaying: fileName })}
            />
          </View>
        </View>
      </View>
    )
  }

  _renderStartButton() {
    return (
      <View style={[Style.boxShadow, styles.startButton]}>
        <TouchableOpacity
          onPress={() => this._submit()}
          style={styles.startBtnAction}
          activeOpacity={0.8}
        >
          <View style={{ width: 58 }} />
          <View style={styles.coverStartText}>
            <Text style={styles.startText}>Start</Text>
          </View>
          <PlaySound
            fileName={'register'}
            buttonAudioStyle={{ backgroundColor: Color.white }}
            iconStyle={{ tintColor: Color.pink }}
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
      <View style={{ flex: 1, backgroundColor: "#ecedf1" }}>
        <StatusBar barStyle={'light-content'} backgroundColor={Color.pink} />
        {this._renderToolbar()}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1, marginBottom: 0 }}>
            {this._renderHeader()}
            {this._renderContent()}
          </View>
        </ScrollView>
        {this._renderStartButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    marginBottom: 10,
    paddingBottom: 10,
  },
  cardIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.pink,
  },
  cardDescription: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  cardFolder: {
    width: 30,
    height: 30,
    tintColor: Color.yellow
  },
  title: {
    flex: 1,
    color: Color.gray,
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  testStoryTitle: {
    fontSize: 23,
    fontWeight: '700'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700'
  },
  cardSubTitle: {
    fontSize: 14,
    fontWeight: '700'
  },
  verticalLine: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 10
  },
  cardHeaderContent: {
    flexDirection: 'row',
    margin: 16,
    padding: 13,
    backgroundColor: Color.white,
  },
  headerCardTitle: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  headerCardMainTitle: {
    fontSize: FontSize.title - 9,
    fontWeight: '700'
  },
  headerCardSubTitle: {
    fontSize: FontSize.body - 4,
    color: Color.gray
  },
  startButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: Color.white,
  },
  startBtnAction: {
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.pink,
    flexDirection: 'row'
  },
  coverStartText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    color: Color.white,
    fontFamily: FontFamily.title,
    fontWeight: '700',
    textTransform: 'uppercase',
  }
});