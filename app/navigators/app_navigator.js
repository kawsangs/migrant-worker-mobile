import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { StatusBar } from 'react-native';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';

import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/currentUserAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import WelcomeScreen from '../screens/welcome';
import RegisterScreen from '../screens/register';
import AboutScreen from '../screens/about';
import VideosScreen from '../screens/videos';
import ViewVideoScreen from '../screens/view_video';
import ImageViewScreen from '../screens/image_view';

import BeforeYouGoScreen from '../screens/before_you_go/before_you_go';
import YourDepartureScreen from '../screens/your_departure/your_departure';
import MigrationScreen from '../screens/before_you_go/migration';
import PreDepartureListScreen from '../screens/before_you_go/predeparture_list';
import ComingHomeScreen from '../screens/before_you_go/coming_home';
import BeforeYouGoVideoScreen from '../screens/before_you_go/videos';
import PrepareYourTripScreen from '../screens/before_you_go/prepare_your_trip';
import YourSafetyScreen from '../screens/your_safety/your_safety';
import YourRightsAndSafetyScreen from '../screens/your_safety/your_rights_and_safety';
import SafetyPlanningScreen from '../screens/your_safety/safety_planning';
import YourSafetyVideosScreen from '../screens/your_safety/videos';
import YourStoryScreen from '../screens/your_story/your_story';
import CreateYourStoryScreen from '../screens/your_story/create_your_story';
import LookingForHelpScreen from '../screens/looking_for_help/looking_for_help';

import SubCategoryScreen from '../screens/sub_category/sub_category';
import BottomTabNavigator from './bottom_tab_navigator';
import HomeButton from '../components/Toolbar/HomeButton';

const Stack = createStackNavigator();

class AppNavigator extends Component {
  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    try {
      const value = await AsyncStorage.getItem('CURRENT_USER')
      if(value !== null) {
        this.props.setCurrentUser(JSON.parse(value));
      }
    } catch(e) {
      // error reading value
    }
  }

  _authStack() {
    return (
      <>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "ចុះឈ្មោះ" }} />
      </>
    )
  }

  _appStack() {
    return (
      <>
        <Stack.Screen name="HomeScreen" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="BeforeYouGoScreen" component={BeforeYouGoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourDepartureScreen" component={YourDepartureScreen}
          options={({route, navigation}) => ({
            title: this.props.t("BeforeYouGoScreen.HeaderTitle"),
            headerStyle: { backgroundColor: Color.red },
            headerRight: (props) => (<HomeButton navigation={navigation}/>),
          })}
        />

        <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen}
          options={({route, navigation}) => ({
            title: this.props.t("PrepareYourTripScreen.HeaderTitle"),
            headerStyle: { backgroundColor: Color.red },
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

        <Stack.Screen name="PreDepartureListScreen" component={PreDepartureListScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MigrationScreen" component={MigrationScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ComingHomeScreen" component={ComingHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BeforeYouGoVideoScreen" component={BeforeYouGoVideoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PrepareYourTripScreen" component={PrepareYourTripScreen} options={{ headerShown: false }} />

        <Stack.Screen name="YourSafetyScreen" component={YourSafetyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourRightsAndSafetyScreen" component={YourRightsAndSafetyScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SafetyPlanningScreen" component={SafetyPlanningScreen} options={{ headerShown: false }} />
        <Stack.Screen name="YourSafetyVideosScreen" component={YourSafetyVideosScreen} options={{ headerShown: false }} />

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

        <Stack.Screen name="LookingForHelpScreen" component={LookingForHelpScreen} options={{ headerShown: false }} />

        <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: "អំពីកម្មវិធី", headerShown: false }} />
        <Stack.Screen name="VideosScreen" component={VideosScreen} options={{ title: "វីដេអូ និងករណីចំណាកស្រុក", headerShown: false }} />
        <Stack.Screen name="ViewVideoScreen" component={ViewVideoScreen} options={{ headerShown: false }} />
      </>
    )
  }

  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Color.primary} />
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Color.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: FontFamily.title, alignSelf: 'center' },
            headerTitleAlign: "center",
            headerTitleContainerStyle: { width: '75%' }
          }}>

          { !this.props.currentUser && this._authStack() }
          { !!this.props.currentUser && this._appStack() }

        </Stack.Navigator>
      </NavigationContainer>
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
