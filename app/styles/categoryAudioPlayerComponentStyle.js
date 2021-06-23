import { StyleSheet } from 'react-native';
import { Color, FontFamily } from '../assets/stylesheets/base_style';

const CategoryAudioPlayerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  iconStyle: {
    padding: 0,
    margin: 0,
  },
  progressBarContainer: {
    width: '75%',
    marginBottom: 20,
  },
  durationLabel: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cateImage: {
    minHeight: 160,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 30,
    shadowColor: "#000",
    overflow: 'hidden',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  miniSoundPlayerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopColor: Color.lightGray,
    borderTopWidth: 1,
    elevation: 4,
    backgroundColor: Color.white,
  }
});

export default CategoryAudioPlayerStyles;