import * as React from 'react';
import { View, Dimensions, ScrollView, Text, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import { Color, FontFamily, Style } from '../assets/stylesheets/base_style';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Icon } from 'react-native-material-ui';
import listData from '../data/json/list_videos';
import uuidv4 from '../utils/uuidv4';
import { addStatistic } from '../utils/statistic';
import { Toolbar } from 'react-native-material-ui';
import Thumbnail from '../components/thumbnail';
import { getVideoId } from '../utils/youtube';
import { useNavigation } from '@react-navigation/native';
import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';

export default function ListVideos() {
  const [index, setIndex] = React.useState(0);
  const initialLayout = { width: Dimensions.get('window').width };
  const states = listData.map((item) => ({ key: item.stepCode, title: `${item.stepTitle}` }));
  const [routes] = React.useState(states);
  const [isConnected, setIsConnected] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(false);
  const navigation = useNavigation();

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe
    }
  }, [NetInfo]);

  const renderNoInternetConnection = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name='info-outline' color='#111' size={24} style={{ marginRight: 8 }} iconSet='MaterialIcons' />
          <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។</Text>
        </View>
        <Text>សូមព្យាយាម​ម្តង​ទៀត​</Text>

        { showLoading && <ActivityIndicator size="small" />}

        <View style={{ marginTop: 20 }}>
          <Button title='ព្យាយាមម្តងទៀត' onPress={() => retryConnection()} />
        </View>
      </View>
    )
  }

  const retryConnection = () => {
    setShowLoading(true);
    NetInfo.fetch().then(state => {
      console.log("retry : ", state)
      setIsConnected(state.isConnected);
      setShowLoading(false)
    });
  }

  const renderToolBar = () => {
    return (
      <Toolbar
        centerElement={'Videos'}
        onRightElementPress={() => this._goTo('HomeScreen')}
        size={30}
        style={{
          titleText: {
            fontFamily: FontFamily.title,
            textAlign: 'center',
          },
          container: { width: '100%' }
        }}
      />
    )
  }

  const onPressItem = (video) => {
    addStatistic('ViewVideo', { videoId: getVideoId(video.url), title: video.title });
    navigation.navigate('ViewVideoScreen', { videoId: getVideoId(video.url) });
  }

  const renderCard = (video) => {
    return (
      <View
        key={uuidv4()}
        style={[Style.card, { flexDirection: 'column' }]}>
        <Thumbnail
          onPress={() => onPressItem(video)}
          imageWidth={'100%'}
          imageHeight={150}
          url={video.url} />

        <View style={{ flex: 1, marginLeft: 12, marginRight: 12, marginTop: 10, marginBottom: 12 }}>
          <TouchableOpacity onPress={() => onPressItem(video)}>
            <Text style={{ fontFamily: FontFamily.title, fontWeight: '700' }}>{video.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const StepRoute = (props) => {
    let step = listData.filter(l => l.stepCode == props.route.key)[0];
    let list = step.list.map((list) => renderCard(list));
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={Style.container}>
          {!isConnected && !showLoading ? <View style={{ flex: 1, justifyContent: 'center', marginTop: 170 }}>
            {renderNoInternetConnection()}
          </View> : list}
        </View>
      </ScrollView>
    )
  };

  const scenMap = () => {
    let obj = {};
    for (let i = 0; i < states.length; i++) {
      obj[states[i].key] = StepRoute
    }
    return obj;
  }

  const renderScene = SceneMap(scenMap());

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Color.primary, height: 4 }}
      style={{ backgroundColor: '#fff' }}
      pressColor={'rgba(0,0,0,0.2)'}
      activeColor={Color.primary}
      inactiveColor={'#121212'}
      labelStyle={{ fontFamily: FontFamily.title }}
      scrollEnabled={true}
      tabStyle={{ width: 'auto' }}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      {renderToolBar()}
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
      />
    </View>
  );
}
