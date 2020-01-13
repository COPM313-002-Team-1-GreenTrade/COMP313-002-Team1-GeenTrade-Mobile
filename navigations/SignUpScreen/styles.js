import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {

  containerView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logoText: {
    fontSize: 25,
    fontWeight: "800",
    marginBottom: 10,
    marginLeft: 10,
    color: '#595959'
  },
  icon: {
    marginLeft: 5,
    marginRight: 8,
    marginTop: 8,
    color: '#3897f1',
  },
  label: {
    marginLeft: 15,
    fontSize: 15,
    color: '#828282',
  },
  inputText: {
    flex: 1,
    fontSize: 16,
  },
  inputView: {
    flex: 1,
    flexDirection: 'row',
    height: 43,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 15,
    elevation: 2,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
    paddingLeft: 5,
    marginLeft: 5,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 40,
    width: 40,
    resizeMode: 'stretch',
  },

  TextStyle: {
    color: 'grey',
    textAlign: 'center',
    fontSize: 16,
  },

  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },

  ErrorTextStyle: {
    color: 'red',
    marginLeft: 5,
    paddingLeft: 5,
    marginBottom: 10,
  },
  SegmentedStyleBox: {
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccddff',

    fontSize: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',

    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  centeredItems: {
    alignItems: 'center'
  },
  centeredText: {
    textAlign: 'center'
  },
  successImage: {
    alignSelf: 'center',
    width: wp('25%'),
    height: wp('25%'),
    margin: 5
  },    
  dialogMessage: {
    textAlign: "center", 
    color: "#00000089", 
    fontSize: 18,
    marginVertical: 30      
  },
  dialogContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  dialogButton: {
    marginTop: 10    
  }
};