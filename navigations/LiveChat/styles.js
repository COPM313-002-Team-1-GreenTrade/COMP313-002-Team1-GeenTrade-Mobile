import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container1: {
      flex: 1,
      paddingBottom: 22
     },
    headerContainer: {
        flexDirection: "row",
        width: wp('100%'),
        height: hp('8.4%'),
        backgroundColor: '#87D5FA',    
    },
    header: {
        flexDirection: "row",
        width: wp('100%'),
        height: hp('9.4%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
      width: wp('22%'),
      height: wp('22%'),
      borderRadius: wp('11%'),
  },
    iconWrapper: {
        flex: 0.5,
    },
    titleWrapper: {
        flex: 2,
    },
    textTitle: {
        fontSize: wp('5%'),
        marginLeft: wp('23%'),
        color: "#fff"
    },
    main: {
      flex: 1,
      padding: 15,
      flexDirection: 'column',
      justifyContent: 'center',
      
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    title1: {
      marginBottom: 40,
      fontSize: 25,
      fontFamily: 'Cochin',
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      marginBottom:7,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 8,
      color: 'blue'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });