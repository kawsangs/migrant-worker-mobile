import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListVideosScreen from '../screens/list_videos';
import MoreScreen from '../screens/more';
import CustomHeaderHome from '../components/custom_header_home';
import CustomBottomTab from '../components/custom_bottom_tab';
import HomeScreen from '../screens/home';

import HomeButton from '../components/Toolbar/HomeButton';
import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function HomeTab() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ route, navigation }) => ({
          header: () => <CustomHeaderHome navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

function MoreTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Color.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: FontFamily.title, alignSelf: 'center' },
        headerTitleAlign: "center",
        headerTitleContainerStyle: { width: '75%' }
      }}>

      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={({route, navigation}) => ({
          title: "បន្ថែម",
          headerStyle: { backgroundColor: Color.primary },
        })}
      />
    </Stack.Navigator>
  );
}

function VideoTab() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "Color.primary" },
        headerTintColor: '#fff',
        headerTitleStyle: { fontFamily: FontFamily.title, alignSelf: 'center' },
        headerTitleAlign: "center",
        headerTitleContainerStyle: { width: '75%' }
      }}>

      <Stack.Screen
        name="Video"
        component={ListVideosScreen}
        options={({route, navigation}) => ({
          title: "វីដេអូ",
          headerTintColor: Color.textBlack,
          headerStyle: { backgroundColor: Color.white, elevation: 0 },
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
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="VideosScreen"
        component={VideoTab}
        options={{
          tabBarLabel: 'Videos',
          headerShown: false
        }}
      />
      <BottomTab.Screen
        name="MoreScreen"
        component={MoreTab}
        options={{
          tabBarLabel: 'More',
          headerShown: false
        }}
      />

    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
