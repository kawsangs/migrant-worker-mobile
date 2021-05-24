import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import { Color, Style, FontFamily } from '../assets/stylesheets/base_style';
import images from '../utils/images';
import { withTranslation } from 'react-i18next';

const home = images.home;
const youtube = images.youtube;
const dotted = images.dotted;

const icons = [home, youtube, dotted];

// function CustomBottomTab({ state, descriptors, navigation }) {
const CustomBottomTab = withTranslation()((props) => {
  const { state, descriptors, navigation } = props;
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={[Style.boxShadow, styles.container]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        let activeColor = isFocused ? Color.primary : Color.gray
        let icon = icons[index % 3];

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, { borderColor: isFocused ? Color.primary : Color.white, }]}
            key={index}
          >
            <Image source={icon} style={[styles.tabIcon, { tintColor: activeColor }]} />
            <Text style={{ color: activeColor, fontFamily: isFocused ? FontFamily.title : FontFamily.body, fontSize: 13 }}>
              {props.t("HomeScreen." + label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
})

// export default withTranslation()(CustomBottomTab);
export default CustomBottomTab;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.white
  },
  tab: {
    flex: 1,
    borderTopWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabIcon: {
    width: 25,
    height: 25,
  }
});
