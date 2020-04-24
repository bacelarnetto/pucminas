import {StyleSheet} from 'react-native';

export default StyleSheet.create({

  header: {
    paddingHorizontal:24,
    paddingTop:25,
    paddingBottom:10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  headerTextBold: {
    fontWeight: 'bold',
  },

});
