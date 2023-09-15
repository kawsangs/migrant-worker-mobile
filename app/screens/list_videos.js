import * as React from 'react';
import { View, Dimensions, FlatList, RefreshControl } from 'react-native';

import { Color, FontFamily } from '../assets/stylesheets/base_style';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import VideoListItemComponent from '../components/VideoList/VideoListItemComponent';
import VideoListNoInternetMessageComponent from '../components/VideoList/VideoListNoInternetMessageComponent';
import NetInfo from "@react-native-community/netinfo";

import { useTranslation } from 'react-i18next';
import uuidv4 from '../utils/uuidv4';
import VideoService from '../services/video_service';
import Video from '../models/Video';
import videoHelper from '../helpers/video_helper';

export default function ListVideos() {
  const { i18n } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const initialLayout = { width: Dimensions.get('window').width };
  const [routes, setRoutes] = React.useState(videoHelper.getTabBarItems());
  const [isConnected, setIsConnected] = React.useState(false);
  const [showLoading, setShowLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      setShowLoading(false);
      setIsConnected(state.isConnected);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => { unsubscribe }
  }, [NetInfo]);

  const retryConnection = () => {
    setShowLoading(true);
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setShowLoading(false)
    });
  }

  const onRefresh = () => {
    if (!isConnected) return

    setRefreshing(true)
    new VideoService().syncAll(() => {
      setRoutes(videoHelper.getTabBarItems())
      setRefreshing(false)
    }, () => setRefreshing(false));
  }

  const screenList = (props) => {
    if (!isConnected && !showLoading)
      return <VideoListNoInternetMessageComponent showLoading={showLoading} retryConnection={() => retryConnection()} />

    return (
      <FlatList
        key={uuidv4()}
        data={props.route.key == 'ទាំងអស់' ? Video.getAll() : Video.findByTag(props.route.key)}
        renderItem={(item, i) => <VideoListItemComponent key={uuidv4()} video={item.item} />}
        keyExtractor={item => uuidv4()}
        contentContainerStyle={{padding: 8}}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[Color.primary]} />}
      />
    )
  };

  const scenMap = () => {
    let obj = {};
    for (let i = 0; i < routes.length; i++) {
      if (!!routes[i])
        obj[routes[i].key] = screenList
    }
    return obj;
  }

  const renderScene = SceneMap(scenMap());

  const renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={({ route }) => route[`title_${i18n.language}`]}
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
