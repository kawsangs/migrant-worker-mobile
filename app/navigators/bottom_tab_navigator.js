import 'react-native-gesture-handler';
import React, { Component } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListVideosScreen from '../screens/list_videos';
import MoreScreen from '../screens/more';
import CustomHeaderHome from '../components/custom_header_home';
import CustomBottomTab from '../components/custom_bottom_tab';
import HomeScreen from '../screens/home';

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

export default BottomTabNavigator;
