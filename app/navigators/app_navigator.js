import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import { StatusBar } from 'react-native';

import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';
import { Icon } from 'react-native-material-ui';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import WelcomeScreen from '../screens/welcome';
import RegisterScreen from '../screens/register';
import AboutScreen from '../screens/about';
import ViewVideoScreen from '../screens/view_video';
import ImageViewScreen from '../screens/image_view';
import ListVideosScreen from '../screens/list_videos';

import YourDepartureScreen from '../screens/your_departure/your_departure';

import YourSafetyScreen from '../screens/your_safety/your_safety';
import YourSafetySubCategoryScreen from '../screens/your_safety/sub_category';

import YourStoryScreen from '../screens/your_story/your_story';
import CreateYourStoryScreen from '../screens/your_story/create_your_story';
import LookingForHelpScreen from '../screens/looking_for_help/looking_for_help';
import CountriesListingScreen from '../screens/looking_for_help/countries_listing';
import NotificationListScreen from '../screens/notification_list/notification_list';
import NotificationDetailScreen from '../screens/notification_detail/notification_detail';

import SubCategoryScreen from '../screens/sub_category/sub_category';
import LeafCategoryScreen from '../screens/leaf_category/leaf_category';
import BottomTabNavigator from './bottom_tab_navigator';
import HomeButton from '../components/Toolbar/HomeButton';
import DeleteNotificationButton from '../components/Toolbar/deleteNotificationButton';
import LoadingIndicator from '../components/loading_indicator';
import Sidekiq from '../models/Sidekiq';
import sessionHelper from '../helpers/session_helper';

const Stack = createStackNavigator();

const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

class AppNavigator extends Component {
  state = { loading: true };

  async componentDidMount() {
    const isNewSession = await sessionHelper.isNewSession();

    if (!isNewSession) {
      AsyncStorage.removeItem('CURRENT_USER');
      this.props.setCurrentUser(null);
      sessionHelper.removeQuizQueue();
    }

    this.getUser();

    setTimeout(() => {
      Sidekiq.uploadAll();
    }, 1000);
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('CURRENT_USER')
      if(value !== null) {
        this.props.setCurrentUser(JSON.parse(value));
      }
      this.setState({loading: false});
    } catch(e) {
      // error reading value
    }
  }

  _authStack() {
    return (
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "ចុះឈ្មោះ" }} />
        <Stack.Screen name="ViewVideoScreen" component={ViewVideoScreen}
          options={({route, navigation}) => ({
            title: "វីដេអូ",
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />
      </>
    )
  }

  _appStack() {
    return (
      <>
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="YourDepartureScreen" component={YourDepartureScreen}
          options={({route, navigation}) => ({
            title: this.props.t("BeforeYouGoScreen.HeaderTitle"),
            headerStyle: { backgroundColor: Color.red },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourDepartureVideoScreen" component={ListVideosScreen}
          initialParams={{ category: 'your_journey' }}
          options={({route, navigation}) => ({
            title: this.props.t("VideosScreen.HeaderTitle"),
            headerTintColor: Color.textBlack,
            headerStyle: { backgroundColor: Color.white, elevation: 0 },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen}
          options={({route, navigation}) => ({
            title: route.params.title,
            headerStyle: { backgroundColor: Color.red },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="LeafCategoryScreen" component={LeafCategoryScreen}
          options={({route, navigation}) => ({
            title: route.params.title,
            headerStyle: { backgroundColor: Color.red },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourSafetyLeafCategoryScreen" component={LeafCategoryScreen}
          options={({route, navigation}) => ({
            title: route.params.title,
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="ImageViewScreen" component={ImageViewScreen}
          options={({route, navigation}) => ({
            title: route.params.title,
            headerStyle: { backgroundColor: Color.red },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourSafetyScreen" component={YourSafetyScreen}
          options={({route, navigation}) => ({
            title: this.props.t('YourSafetyScreen.HeaderTitle'),
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourSafetySubCategoryScreen" component={YourSafetySubCategoryScreen}
          options={({route, navigation}) => ({
            title: route.params.title,
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourSafetyVideosScreen" component={ListVideosScreen}
          initialParams={{ category: 'your_safety' }}
          options={({route, navigation}) => ({
            title: this.props.t("VideosScreen.HeaderTitle"),
            headerTintColor: Color.textBlack,
            headerStyle: { backgroundColor: Color.white, elevation: 0 },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="YourStoryScreen" component={YourStoryScreen}
          options={({route, navigation}) => ({
            title: this.props.t('YourStoryScreen.HeaderTitle'),
            headerStyle: { backgroundColor: Color.pink },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="CreateYourStoryScreen" component={CreateYourStoryScreen}
          options={({route, navigation}) => ({
            title: this.props.t('CreateYourStoryScreen.HeaderTitle'),
            headerStyle: { backgroundColor: Color.pink, elevation: 0 },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="AboutScreen" component={AboutScreen}
          options={({route, navigation}) => ({
            title: route.params.title || "អំពី",
            headerStyle: { backgroundColor: Color.primary },
          })}
        />
        <Stack.Screen name="ViewVideoScreen" component={ViewVideoScreen}
          options={({route, navigation}) => ({
            title: "វីដេអូ",
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />
        <Stack.Screen name="UserFormScreen" component={RegisterScreen} options={{ title: "កែតម្រូវគណនី" }} />

        <Stack.Screen name="LookingForHelpScreen" component={LookingForHelpScreen}
          options={({route, navigation}) => ({
            title: 'ស្វែងរកជំនួយ',
            headerStyle: { backgroundColor: Color.yellow, elevation: 0 },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })} />

        <Stack.Screen name="CountriesListingScreen" component={CountriesListingScreen}
          options={({route, navigation}) => ({
            title: 'ជ្រើសរើសប្រទេសចំណាកស្រុក',
            headerStyle: { backgroundColor: Color.yellow },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })} />

        <Stack.Screen name="NotificationListScreen" component={NotificationListScreen}
          options={({route, navigation}) => ({
            title: this.props.t('NotificationListScreen.HeaderTitle'),
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="NotificationDetailScreen" component={NotificationDetailScreen}
          options={({route, navigation}) => ({
            title: this.props.t('NotificationDetailScreen.HeaderTitle'),
            headerStyle: { backgroundColor: Color.primary },
            headerRight: (props) => (<DeleteNotificationButton navigation={navigation} uuid={route.params.uuid} />),
          })}
        />
      </>
    )
  }

  _rendAppNavigation() {
    const currentUser = !!this.props.currentUser && !!this.props.currentUser.uuid;

    return (
      <NavigationContainer ref={navigationRef} >
        <StatusBar backgroundColor={Color.primary} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Color.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: FontFamily.title, alignSelf: 'center' },
            headerTitleAlign: "center",
            headerTitleContainerStyle: { width: '75%' }
          }}>

          { !currentUser && this._authStack() }
          { !!currentUser && this._appStack() }

        </Stack.Navigator>
      </NavigationContainer>
    )
  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator loading={this.state.loading} />
    }

    return (
      this._rendAppNavigation()
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
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
)(withTranslation()(AppNavigator));
