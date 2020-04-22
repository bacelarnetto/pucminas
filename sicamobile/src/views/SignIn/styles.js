import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#5db148',
    borderWidth: 1,
    borderColor: '#5db148',
    borderRadius: 4,
    color: '#FFF',
    marginTop: 20,
    paddingHorizontal: 15,
  },

  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#115301',
    borderRadius: 4,    
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color:'#aac6a5',
    fontWeight: 'bold',
    fontSize: 16,
  },
  messageErro: {
    backgroundColor: '#F08072',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
  },
  messageErroText: {
    color: '#800000',
    textAlign: 'center',
  },
  loading: {
    height: 46,
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
