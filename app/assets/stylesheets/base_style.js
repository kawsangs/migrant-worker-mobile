import { StyleSheet } from 'react-native';

export const Color = {
  primary: '#009e69',
  border: '#d1d1d1',
  delete: '#e44a4a',
  cancel: '#f75353',
  gray: '#9a9a9a',
  errorText: '#e44a4a',
  btnDisabled: '#8a8a8e',
};

export const FontFamily = {
  body: 'KhmerOSContentRegular',
  title: 'KhmerOSContentBold'
};

export const FontSize = {
  body: 16,
  title: 28
};

export const Style = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  }
});

