import {StyleSheet} from 'react-native';
import { Color, FontFamily } from '../assets/stylesheets/base_style';

const registerScreenStyles = StyleSheet.create({
  container: {
    margin: 24,
    flexDirection: 'column'
  },
  buttonWrapper: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    backgroundColor: Color.white,
    borderColor: Color.border,
  },
  buttonAudioWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 58,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  textInput: {
    height: 52,
    paddingLeft: 38,
    flex: 1,
    fontSize: 16,
    fontFamily: FontFamily.body
  },
  errorText: {
    color: Color.errorText,
    fontSize: 12
  },
  inputIcon: {
    position: 'absolute',
    top: 18,
    left: 10
  },
  voiceRecord: {
    backgroundColor: Color.white,
    minHeight: 105,
    borderWidth: 1,
    borderColor: Color.border,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 6,
    paddingBottom: 12,
    marginBottom: 34,
  },
});

export default registerScreenStyles;