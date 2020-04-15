import { StyleSheet } from 'react-native';

export default Style = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3
  },
  container: {
    margin: 16,
    flexDirection: 'column'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
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
  cardContent: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#efefef',
    marginBottom: 14,
    paddingBottom: 14
  },
  avata: {
    width: 72,
    height: 72,
    backgroundColor: '#edeff8',
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },

});

