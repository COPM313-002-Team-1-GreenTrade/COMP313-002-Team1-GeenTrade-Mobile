import { StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    
      container: {
        width: wp('80%'),
        height: hp('5%'),
        marginVertical: hp('2%'),
        borderBottomColor: 'dimgrey',
        borderBottomWidth: hp('0.1%'),
        marginLeft: wp('3%')
      },
      textInput: {
        fontSize: wp('4%'),
        marginTop: hp('1.5%'),
        color: '#4C4B4B',
      },
      titleStyles: {
        position: 'absolute',
        marginBottom: hp('1%'),
      },
})