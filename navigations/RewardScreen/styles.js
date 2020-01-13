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
    profileContainer:{
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
   emailTxt:{
    marginTop: wp('2%'),
    color: 'dimgrey'
   },
   DrawerComponentScrollView: {
    // marginTop: hp('5"%'),
  },
  menuItem: {
     justifyContent:'center',
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
    marginLeft: wp('22%'),
    color: "#fff"
},
drawerIcon: {
    marginLeft: wp('-6%')
},
bottom: {
    height: hp('15%')
},
scene: {
    width: wp('100%'),
  height: hp('100%'),
  backgroundColor: '#F7F4F3',
  flex: 1
},
tabBar: {
  backgroundColor: '#fff',
  borderWidth: 0,
  marginTop: wp('3%'),
  height: wp('7%')
},
tabItem: {
  flex: 1,
  alignItems: 'center',
  paddingTop: wp('3%')
},
initialLayout: {
    width: wp('100%'),
    height: hp('30%'),
    marginTop: hp('10%')
},
tabText: {
   color: '#87D5FA',
  fontSize: wp('3.5%'),
  textTransform: 'capitalize', 
  marginTop: wp('-6%'),
  marginLeft: wp('-5%')
},
indocator: {
  backgroundColor: '#87D5FA',
  width: wp('40%'),
  marginLeft: wp('2%'),
  marginTop: wp('-6%')
},
 tab: {
  borderWidth: 0,
}, 
sceneContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    
  //   borderColor: '#000',
  //   borderWidth: 1
},
headerImg: {
    width: wp('100%'),
    height: wp('45.8%')
},
topContainer: {
    height: wp('25%')
},
pointText: {
    fontSize: wp('6.5%'),
    color: '#FBDFAA',

    
},
pointContainer: {
    // borderWidth: 1,
    // borderColor: 'black',
    width: wp('30%'),
    height: wp('8%'),
    marginTop: wp('-7%'),
    marginLeft: wp('50%'),
},
starIcon: {
    fontSize: wp('6.5%'),
    marginLeft: wp('-20%'),
},
listContainer: {
    width: wp('100%'),
    height: wp('50%'),
    backgroundColor: '#F7F4F3',
    marginTop: wp('1%'),
},
itemContainer: {
    flexDirection: 'row',
    height: hp('12%'),
    width: wp('92%'),
    backgroundColor: '#fff',
    marginVertical: wp('1%')
},
img: {
    width: wp('18%'),
    height: wp('18%')
},
itemTxt: {
    fontSize: wp('4%'),
    marginTop: hp('-0.5%'),
    marginLeft: wp('3%'),
    color: '#4B212F'
},
rewardNameTxt: {
    marginLeft: wp('-10%'),
    fontSize: wp('4%')
},
img: {
    marginLeft: wp('4%'),
    width: wp('20%'),
    height: wp('20%')
},
moreTxt: {
    marginLeft: wp('3%'),
    color: '#A5A2A2',
    fontSize: wp('4%')
},
iconGo: {
    marginLeft: wp('3%')
},
listPoint: {
    fontSize: wp('5%'),
    color: '#FBDFAA',
    
    flex: 1,
},
dateTxt: {
    marginTop: wp('5%'),
    marginLeft: wp('-10%'),
    color: '#A5A2A2',
    fontSize: wp('4%')
},
iconAfterDate: {
    marginTop: wp('-5%'),
    marginLeft: wp('35%'),
},
bottom: {
    height: hp('10%'),
    backgroundColor: '#F7F4F3'
},
costWrapper: {
    width: wp('12%'),
    // borderColor: 'black',
    // borderWidth: 1
},
contentWrapper: {
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black',
    marginTop: wp('2%'),
    marginLeft: wp('-10%'),
},
body: {
    flexDirection: 'column'
},

displayMessage: {
    justifyContent: "center",
    fontSize: wp('5%'),
    color: "#3973ad",
},
})