import { StyleSheet, Platform, StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
    },
    safeView: {
        flexDirection: "column",
    },
    profileContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: wp('0%'),
        height: hp('30%'),
        backgroundColor: '#AFE2FC',
    },
    profileImg: {
        width: wp('22%'),
        height: wp('22%'),
        borderRadius: wp('11%'),
        marginTop: wp('8%')
    },
    nameTxt: {
        marginTop: wp('2%'),
        fontSize: wp('5%')
    },
    emailTxt: {
        marginTop: wp('2%'),
        color: 'dimgrey'
    },
    DrawerComponentScrollView: {
        // marginTop: hp('5"%'),
    },
    menuItem: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    menuIcon: {
        fontSize: wp('5%')
    },
    container: {
        flex: 1,
        flexDirection: "column",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
    iconWrapper: {
        flex: 0.5,
    },
    titleWrapper: {
        flex: 2,
    },
    textTitle: {
        fontSize: wp('5%'),
        marginLeft: wp('18%'),
        color: "#fff"
    },
    drawerIcon: {
        marginLeft: wp('-6%')
    },
    cameraWrapper: {
        marginTop: hp('3%'),
        height: wp('35%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraImg: {
        
        alignSelf: 'center',
        width: wp('35%'),
        height: wp('35%')
    },
    dialogContainer: {
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    dialog: {
        width: wp('70%'),
        borderRadius: wp('10%'),
        alignSelf: 'center'
    },
    customDialog: {
        flexDirection: 'column',
        height: hp('15%'),
        justifyContent: 'center',
        alignItems: 'center'
    },
    takePhoto: {
        width: wp('30%'),
        alignItems: 'center',
        paddingTop: hp('5%'),
        // left: hp('15%'),

    },
    container2: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 10
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center'
    },
    contentContainer: {
        paddingTop: 30
    },

    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50
    },

    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center'
    },

    helpContainer: {
        marginTop: 15,
        alignItems: 'center'
    },
    waveContainer: {
        marginTop: hp('4%'),
        marginHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    wave: {
        width: 100,
        aspectRatio: 1,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    waveBall: {
        width: wp('40%'),
        aspectRatio: 1,
        borderRadius: wp('30%'),
        overflow: 'hidden',
        borderWidth: wp('0.2%'),
        borderColor: '#1aa7ff'
    },
    perText: {
        fontSize: wp('8%'),
        marginTop: wp('-25%')
    },
    welcomeWrapper: {
        // borderWidth: 1,
        // borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('100%'),
        height: wp('10%'),
    },
    welcomeTxt: {
        fontSize: wp('5%'),
        color: 'rgba(96,100,109, 1)',
    },
    pointWrapper: {
        // borderWidth: 1,
        // borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('100%'),
        height: wp('10%'),
        marginTop: wp('20%')
    },
    pointTxt: {
        fontSize: wp('5%'),
        color: 'rgba(96,100,109, 1)',
        fontWeight: 'bold'
    },
    btnTxt:{
        color: '#1aa7ff',
         fontSize: wp('5%'),
         marginVertical: wp('2.2%')
     }
});