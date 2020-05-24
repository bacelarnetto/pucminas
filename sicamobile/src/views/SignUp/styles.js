import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#E3E3E3',
  },

  header: {
    paddingHorizontal:24,
    paddingTop:25,
    paddingBottom:10,
    flexDirection: 'row',
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

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#636363',
    paddingHorizontal:24,
  },

  detailPanelHeader:{
    marginTop: 1,
    padding: 14,
    backgroundColor: '#FFF',
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
  },

  detailPanelTitle: {
    fontSize: 16,
    color: '#636363',
    fontWeight: 'bold',
    paddingHorizontal:18,
  },

  detailPanel: {
    padding: 24,
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

  detailAction: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#115301',
    borderRadius: 4,    
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color:'#aac6a5',
    fontWeight: 'bold',
    fontSize: 16,
  },

  input: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  loading: {
    height: 46,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
