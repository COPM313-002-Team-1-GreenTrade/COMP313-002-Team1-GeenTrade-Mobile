import { StyleSheet, Platform, StatusBar } from 'react-native';
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
        marginLeft: wp('23%'),
        color: "#fff"
    },
    drawerIcon: {
        marginLeft: wp('-6%')
    },
    avatarContainer: {
        height: hp('18%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: wp('10%')
    },
    avatar: {
        width: wp('22%'),
        height: wp('22%'),
        borderRadius: wp('11%'),
    },
    addPhoto: {
        marginTop: hp('-4%'),
        marginLeft: wp('15%')
    },
    hint: {
        fontSize: wp('3%'),
        color: '#758AA2',
        marginTop: hp('2%'),
    },
    hintText: {
        fontSize: wp('4%'),
        color: '#758AA2',
        marginTop: hp('2%'),
    },
    itemIcon: {
        marginTop: wp('4%')
    },
    right: {
        borderBottomWidth: hp('0%'),
    },
    body: {
        marginLeft: wp('-50%'),
    },
    listWrapper: {
        width: wp('100%'),
        marginTop: wp('2%'),
        backgroundColor: '#fff',
    },
    itemWrapper: {
        flexDirection: 'row',
        height: hp('10%')
    },
    itemText: {
        fontSize: wp('4%'),
        marginTop: wp('3%'),
        color: '#1C1918',
    },
    btn: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        width: wp('80%'),
        height: hp('6%'),
        backgroundColor: '#87D5FA',
        borderRadius: wp('20%'),
        alignSelf: 'center'
    },
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp('10%')
    },
    btnText: {
        fontSize: wp('5%'),
        marginTop: hp('-0.5%'),
        color: '#fff'
    },
    inputContainer: {
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: wp('5%')
    },
    textInput: {
        fontSize: wp('4%'),
        marginTop: wp('1.5%'),
        color: '#4C4B4B',
        paddingTop: wp('20%'),
      },
    input: {
        marginTop: wp('5%'),
        marginBottom: wp('5%'),
        paddingTop: wp('5%'),
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('88%'),
        backgroundColor: "#FFF",
        borderRadius: 20,
        alignSelf: 'center'
    },

    circle: {
        width: wp('47%'),
        height: wp('47%')
    },
    circleContainer: {
        height: hp('5%'),
        width: wp('5%'),
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp('-10%')
    },
    phoneListContainer: {
        top: wp("10%"),
        // height: hp('4%')
    },
    phoneList: {
        borderStyle: "solid",
        borderBottomColor: "#000000",
        borderBottomWidth: wp("0.18%"),
        borderWidth: wp("0.12"),
        padding: wp("6%"),
        borderRadius: wp("6%"),
        alignSelf: 'center',
        backgroundColor: 'white',
        width: wp('80%'),
        shadowColor: "black",
        shadowOffset: { width: 15, height: 7 },
    },
})