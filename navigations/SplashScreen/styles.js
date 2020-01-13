import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default {
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
};