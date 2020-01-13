import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
    containerView: {
        flex: 1,
    },
    loginScreenContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      },
    logoText: {
        fontSize: 35,
        fontWeight: "800",
        marginTop: 150,
        marginBottom: 30,
        textAlign: 'center',
        color: 'grey'
    },
  logoContainer: {
      alignItems: "center", 
      justifyContent: "center" ,
  },
  logoImage: {
      height: 200,
      width: 200,
      margin: 10
    },
    loginFormView: {
        flex: 1
    },
    loginFormTextInput: {
        height: 43,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#eaeaea',
        backgroundColor: '#fafafa',
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
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
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    googleSignInButton: {
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
    },
    GooglePlusStyle: {
        height: 45,
        marginTop: 10,
        paddingLeft: 10,
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'grey',
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
        marginLeft: 15,
        paddingLeft: 10,
      },
};