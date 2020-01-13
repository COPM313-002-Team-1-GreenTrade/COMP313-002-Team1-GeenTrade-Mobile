import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#fff',
        width: wp('68%')
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
        marginTop: hp('60%'),
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
});