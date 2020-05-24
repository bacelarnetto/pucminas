import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#EEFFEF',
  },

   title: {
    fontSize: 20,
    marginBottom: 16,
    marginTop: 20,
    color: '#13131a',
    fontWeight: 'bold',
    paddingHorizontal:24,
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#636363',
    paddingHorizontal:24,
  },

  detailPanel: {
    padding: 24,
    backgroundColor: '#FFF',
    paddingBottom: 28,
    marginTop: 28,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  detailPanelProperty: {
    fontSize: 14,
    color: '#41414d',
    fontWeight: 'bold',
    marginTop: 24,
  },

  detailPanelValue: {
    marginTop: 8,
    fontSize: 15,
    color: '#737380',
  },

  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
