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
import Contact1280Screen from '../screens/contact1280';
import AboutScreen from '../screens/about';
import ProfileListScreen from '../screens/profile_list';
import SafeMigrationScreen from '../screens/safe_migration';
import TextInfoScreen from '../screens/text_info';
import ServiceDirectoryScreen from '../screens/service_directory';
import ServiceDirectoryDetailScreen from '../screens/service_directory_detail';
import VideosScreen from '../screens/videos';
import ViewVideoScreen from '../screens/view_video';

import AgreementScreen from '../screens/other_info/agreement';
import ChecklistScreen from '../screens/other_info/checklist';
import OtherDocScreen from '../screens/other_info/other_doc';
import PassportScreen from '../screens/other_info/passport';
import WorkbookScreen from '../screens/other_info/workbook';

const Stack = createStackNavigator();

export default class AppNavigator extends Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar backgroundColor={Color.primary} translucent={true} />
        <Stack.Navigator
          initialRouteName="SafeMigrationScreen"
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
          <Stack.Screen name="Contact1280Screen" component={Contact1280Screen} options={{title: "ទាក់ទងទៅលេខ១២៨០"}} />
          <Stack.Screen name="OtherInfoScreen" component={OtherInfoScreen} options={{title: "ចំណាកស្រុកសុវត្ថិភាព"}} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title: "ចុះឈ្មោះ"}} />
          <Stack.Screen name="AboutScreen" component={AboutScreen} options={{title: "អំពីកម្មវិធី"}} />
          <Stack.Screen name="SafeMigrationScreen" component={SafeMigrationScreen} options={{title: "ចំណាកស្រុកសុវត្ថិភាព ត្រូវមានអ្វីខ្លះ?"}} />
          <Stack.Screen name="TextInfoScreen" component={TextInfoScreen} options={{title: "ព័ត៌មានជាអក្សរ"}} />
          <Stack.Screen name="ServiceDirectoryScreen" component={ServiceDirectoryScreen} options={{title: "សៀវភៅអំពីសេវា"}} />
          <Stack.Screen name="ServiceDirectoryDetailScreen" component={ServiceDirectoryDetailScreen} options={{title: "សៀវភៅអំពីសេវាលម្អិត"}} />
          <Stack.Screen name="VideosScreen" component={VideosScreen} options={{title: "វីដេអូ និងករណីចំណាកស្រុក"}} />
          <Stack.Screen name="ViewVideoScreen" component={ViewVideoScreen} options={{title: "វីដេអូ"}} />

          <Stack.Screen name="AgreementScreen" component={AgreementScreen} options={{title: "កុងត្រាស្វែករកការងារក្នុងប្រទេសគោលដៅ"}} />
          <Stack.Screen name="ChecklistScreen" component={ChecklistScreen} options={{title: "បញ្ជីត្រួតពិនិត្យមុនចេញដំណើរ"}} />
          <Stack.Screen name="OtherDocScreen" component={OtherDocScreen} options={{title: "ឯកសារផ្សេងៗ"}} />
          <Stack.Screen name="PassportScreen" component={PassportScreen} options={{title: "លិខិតឆ្លងដែន"}} />
          <Stack.Screen name="WorkbookScreen" component={WorkbookScreen} options={{title: "សៀវភៅការងារ"}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
