import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'react-native';
import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';

// screens
import HomeScreen from '../screens/home';
import WelcomeScreen from '../screens/welcome';
import OtherInfoScreen from '../screens/other_info';
import RegisterScreen from '../screens/register';
import Contact1280Screen from '../screens/contact1280';
import AboutScreen from '../screens/about';
import ProfileListScreen from '../screens/profile_list';
import SafeMigrationScreen from '../screens/safe_migration';
import TextInfoScreen from '../screens/text_info';
import ServiceDirectoryScreen from '../screens/service_directory';
import VideosScreen from '../screens/videos';
import ViewVideoScreen from '../screens/view_video';

import OtherDocScreen from '../screens/safe_migration/other_doc';

import ContactRelativeScreen from '../screens/text_info/contact_relative';
import MigrationAgencyScreen from '../screens/text_info/migration_agency';

import PdfViewScreen from '../screens/pdf_view';
import ImageViewScreen from '../screens/image_view';

import CustomHeaderHome from '../components/custom_header_home';
import CustomBottomTab from '../components/custom_bottom_tab';
import MoreScreen from '../screens/more';
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
import TestResultScreen from '../screens/your_story/test_result';
import LookingForHelpScreen from '../screens/looking_for_help/looking_for_help';
import ListVideosScreen from '../screens/list_videos';

import SubCategoryScreen from '../screens/sub_category/sub_category';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ }) => ({
          header: () => <CustomHeaderHome />,
        })}
      />
    </Stack.Navigator>
  );
}

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      tabBar={(props) => <CustomBottomTab {...props} />}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <BottomTab.Screen
        name="VideosScreen"
        // component={VideosScreen}
        component={ListVideosScreen}
        options={{
          tabBarLabel: 'Videos',
        }}
      />
      <BottomTab.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{
          tabBarLabel: 'More',
        }}
      />

    </BottomTab.Navigator>
  );
};

export default class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Color.primary} />
        <Stack.Navigator
          // initialRouteName="YourDepartureScreen"
          // initialRouteName="BeforeYouGoScreen"
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: Color.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: FontFamily.title,
            },
            headerTitleContainerStyle: {
              width: '75%'
            }
          }}
        >

          <Stack.Screen name="HomeScreen" component={BottomTabNavigator} options={{ headerShown: false }} />

          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ headerShown: false }} />


          <Stack.Screen name="BeforeYouGoScreen" component={BeforeYouGoScreen} options={{ headerShown: false }} />

          <Stack.Screen name="YourDepartureScreen" component={YourDepartureScreen} options={{ headerShown: false }} />

          <Stack.Screen name="PreDepartureListScreen" component={PreDepartureListScreen} options={{ headerShown: false }} />

          <Stack.Screen name="SubCategoryScreen" component={SubCategoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="MigrationScreen" component={MigrationScreen} options={{ headerShown: false }} />

          <Stack.Screen name="ComingHomeScreen" component={ComingHomeScreen} options={{ headerShown: false }} />

          <Stack.Screen name="BeforeYouGoVideoScreen" component={BeforeYouGoVideoScreen} options={{ headerShown: false }} />

          <Stack.Screen name="PrepareYourTripScreen" component={PrepareYourTripScreen} options={{ headerShown: false }} />

          <Stack.Screen name="YourSafetyScreen" component={YourSafetyScreen} options={{ headerShown: false }} />

          <Stack.Screen name="YourRightsAndSafetyScreen" component={YourRightsAndSafetyScreen} options={{ headerShown: false }} />

          <Stack.Screen name="SafetyPlanningScreen" component={SafetyPlanningScreen} options={{ headerShown: false }} />

          <Stack.Screen name="YourSafetyVideosScreen" component={YourSafetyVideosScreen} options={{ headerShown: false }} />

          <Stack.Screen name="YourStoryScreen" component={YourStoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="CreateYourStoryScreen" component={CreateYourStoryScreen} options={{ headerShown: false }} />

          <Stack.Screen name="TestResultScreen" component={TestResultScreen} options={{ headerShown: false }} />

          <Stack.Screen name="LookingForHelpScreen" component={LookingForHelpScreen} options={{ headerShown: false }} />


          <Stack.Screen
            name="ProfileListScreen"
            component={ProfileListScreen}
            options={({ navigation, route }) => ({
              title: 'ប្រវត្តិចុះឈ្មោះ',
              headerLeft: () => (<HeaderBackButton tintColor={'white'} onPress={() => { navigation.popToTop() }} />),
              headerShown: false
            })}
          />

          <Stack.Screen name="Contact1280Screen" component={Contact1280Screen} options={{ title: "ទាក់ទងទៅលេខជំនួយ១២៨០", headerShown: false }} />
          <Stack.Screen name="OtherInfoScreen" component={OtherInfoScreen} options={{ title: "ចំណាកស្រុកសុវត្ថិភាព" }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ title: "ចុះឈ្មោះ", headerShown: false}} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ title: "អំពីកម្មវិធី", headerShown: false }} />
          <Stack.Screen name="SafeMigrationScreen" component={SafeMigrationScreen} options={{ title: "ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?", headerShown: false }} />
          <Stack.Screen name="TextInfoScreen" component={TextInfoScreen} options={{ title: "ព័ត៌មានជាអក្សរ", headerShown: false }} />
          <Stack.Screen name="ServiceDirectoryScreen" component={ServiceDirectoryScreen} options={{ title: "សៀវភៅទូរស័ព្ទរកជំនួយ" }} />
          <Stack.Screen name="VideosScreen" component={VideosScreen} options={{ title: "វីដេអូ និងករណីចំណាកស្រុក", headerShown: false }} />
          <Stack.Screen name="ViewVideoScreen" component={ViewVideoScreen} options={{ headerShown: false }} />

          <Stack.Screen name="OtherDocScreen" component={OtherDocScreen} options={{ title: "ឯកសារផ្សេងៗ" }} />

          <Stack.Screen name="ContactRelativeScreen" component={ContactRelativeScreen} options={{ title: "វិធីទំនាក់ទំនងសាច់ញាតិ" }} />
          <Stack.Screen name="MigrationAgencyScreen" component={MigrationAgencyScreen} options={{ title: "ភ្នាក់ងារចំណាកស្រុក", headerShown: false }} />

          <Stack.Screen name="PdfViewScreen" component={PdfViewScreen} options={({ route }) => ({ title: route.params.title })} />
          <Stack.Screen name="ImageViewScreen" component={ImageViewScreen} options={({ route }) => ({ title: route.params.title, headerShown: false })} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
