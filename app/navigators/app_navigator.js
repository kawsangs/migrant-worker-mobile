import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text } from 'react-native';
import { Color, FontFamily, FontSize } from '../assets/stylesheets/base_style';

// screens
import HomeScreen from '../screens/home';
import OtherInfoScreen from '../screens/other_info';
import RegisterScreen from '../screens/register';
import ChcScreen from '../screens/chc';
import AboutScreen from '../screens/about';
import ProfileListScreen from '../screens/profile_list';

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Color.primary} translucent={true} />
        <Stack.Navigator
          initialRouteName="ProfileListScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: Color.primary,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontFamily: FontFamily.title,
            }
          }}>

          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
          <Stack.Screen name="ProfileListScreen" component={ProfileListScreen} options={{title: "ប្រវត្តិចុះឈ្មោះ"}}/>
          <Stack.Screen name="ChcScreen" component={ChcScreen} options={{title: "ទាក់ទងទៅលេខ១២៨០"}} />
          <Stack.Screen name="OtherInfoScreen" component={OtherInfoScreen} options={{title: "ចំណាកស្រុកសុវត្ថិភាព"}} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title: "ចុះឈ្មោះ"}} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} options={{title: "អំពីកម្មវិធី"}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
