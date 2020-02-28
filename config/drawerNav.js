import React, { Component } from "react";
import { Image, SafeAreaView, Text, View, Alert } from 'react-native';
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import  { createDrawerNavigator, DrawerNavigatorItems} from "react-navigation-drawer";
import { createStackNavigator } from "react-navigation-stack";
import { DrawerActions } from 'react-navigation-drawer';
import { NavigationActions, StackActions } from 'react-navigation'
import { Divider, Icon } from "react-native-elements";
import styles from "../navigations/HomeScreen/styles";
import HomeView from "../navigations/HomeScreen/Container";
import UserContainerSelectionView from "../navigations/UserContainerSelectionScreen/UserContainerSelectionView";
import StackNavigator from"./navigation";
import firebase from 'firebase';
import SplashView from "../navigations/SplashScreen/SplashView";
import SignInView from "../navigations/SignInScreen/SignInView";
import SignUpView from "../navigations/SignUpScreen/SignUpView";
import CollectorPickupView from "../navigations/CollectorPickupLocationScreen/container";
import CollectorPickupHistory from "../navigations/CollectorPickupHistory/CollectorPickupHistoryView";
import Scheduling from "../navigations/SchedulePickUp/Scheduling";
import ContainerView from "../navigations/ContainerScreen/ContainerView";
import CollectorMapView from "../navigations/CollectMapScreen/CollectorMapView";
import PaymentView from "../navigations/PaymentScreen/PaymentView";
import ProfileView from "../navigations/ProfileScreen/ProfileView";
import RecycledItemsHistoryView from "../navigations/RecycledItemsHistoryScreen/RecycledItemsHistoryView";
import NameEditView from "../navigations/ProfileScreen/NameEditView"
import EmailEditView from "../navigations/ProfileScreen/EmailEditView"
import AddressEditView from "../navigations/ProfileScreen/AddressEditView";
import PhoneEditView from "../navigations/ProfileScreen/PhoneEditView";
import { connect } from 'react-redux';
import {updateFirstName} from '../actions/Profile/actionCreators';
import {updateLastName} from '../actions/Profile/actionCreators';
import {updateEmail} from '../actions/Profile/actionCreators';
import {updateAvatar} from '../actions/Profile/actionCreators';


class DrawerComponent extends Component {
	constructor(props) {
		super(props);
	}
	state = {
		user: {},
    };
    componentDidMount() {
        try {
            const db = firebase.firestore();
            var user = db.collection("users").doc(firebase.auth().currentUser.uid);
            user.get().then(u => {
              if (u.exists) {
                 this.setState({user: u.data()});
                //  this.props.updateFirstName(this.state.user.firstName)
                //  this.props.updateLastName(this.state.user.lastName)
                //  this.props.updateEmail(this.state.user.email)
                //  this.props.updateAvatar(this.state.user.profilePhoto)
                //  console.log(this.props.lastName);
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
    filterMenuByUserRole = (items) => {
        //console.log('>>> filtering drawerNav');
        return items.filter(i=>
            i.params && i.params.role && 
            (i.params.role.includes("*") ||
             i.params.role.includes(this.state.user.type))             
            );
    };
    onItemPress = (route, focused, props) => {
        console.log('onItemPress > route: ' + JSON.stringify(route) + ' focused: ' + focused);
        if(route.key == 'LogOut'){
            Alert.alert(
                'Log out', 'Do you want to logout?',
                [
                    { text: 'Cancel', onPress: () => { return null } },
                    {
                        text: 'Confirm', onPress: () => {
                            firebase.auth().signOut().then(function () {
                                console.info('Sign-out successful');
                                props.navigation.dispatch(DrawerActions.closeDrawer());
                                props.navigation.navigate('Splash');
                                
                            }).catch(function (error) {
                                console.error(error.message);
                            });
                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            props.onItemPress({ route, focused });
        }
    };
    render() {
        const { items, ...props } = this.props;
        const menuItems = this.filterMenuByUserRole(items);

        return (
            <SafeAreaView style={styles.menuContainer}>
                <View style={styles.profileContainer}>
                    <Image
                        source={{ uri: this.state.user.profilePhoto}}
                        style={styles.profileImg}
                    />
                    <Text style={styles.nameTxt}>{this.state.user.firstName} {this.state.user.lastName}</Text>
                    <Text style={styles.emailTxt}>{this.state.user.email}</Text>
                </View>
                <View style={styles.safeView}>
                    <View style={styles.DrawerComponentScrollView}>
                        <DrawerNavigatorItems style={styles.menuItem}  {...props}
                            items={menuItems}
                            onItemPress={({ route, focused }) => this.onItemPress(route, focused, props)} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

// function mapStateToProps (state){
//     return{
//         firstName: state.editNameReducer.firstName,
//         lastName: state.editNameReducer.lastName,
//         email: state.editEmailReducer.email,
//         avatarUrl: state.editAvatarReducer.avatarUrl
//     }; 
//   }

//   function mapDispatchToProps (dispatch)  {
//     return {
//         updateFirstName: (f) => dispatch(updateFirstName(f)),
//         updateLastName: (l) => dispatch(updateLastName(l)),
//         updateEmail: (e) => dispatch(updateEmail(e)),
//         updateAvatar: (avatar) => dispatch(updateAvatar(avatar)),
//     };
//   }

// connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)

const CollectorPickupStack = createStackNavigator({
    CollectorPickup: CollectorPickupView,
    CollectorMap: CollectorMapView,
},
    {
        headerMode: "none", //Hide the back button react navigation
    })

const ContainerPurchaseStack = createStackNavigator({
    PurchaseContainer: UserContainerSelectionView,
    Payment: PaymentView,
},
{
    headerMode: "none", //Hide the back button react navigation
});

const ProfileStack = createStackNavigator({
    Profile: ProfileView,
    NameEdit: NameEditView,
    EmailEdit: EmailEditView,
    AddressEdit: AddressEditView,
    PhoneEdit: PhoneEditView
},
{
    headerMode: "none",
    initialRouteName: 'Profile'},
)

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: StackNavigator, navigationOptions: {
                drawerLabel: "Home",
                drawerIcon: <Icon type="font-awesome" name="home" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['member', 'collector']}
        },
         EditProfile: {
             screen: ProfileStack, navigationOptions: {
                 drawerLabel: "Profile",
                drawerIcon: <Icon type="material-community" name="account-box-multiple" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            
             },
             params: {role: ['member', 'collector']}
         },
        Pickup: {
            screen: CollectorPickupStack, navigationOptions: {
                drawerLabel: "Track Pickups",
                drawerIcon: <Icon type="material-community" name="cellphone" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['collector']}
        },
        
        CollectorPickupHistory: {
            screen: CollectorPickupHistory, navigationOptions: {
                drawerLabel: "Completed Pickups",
                drawerIcon: <Icon type="material-community" name="history" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['collector']}
        },
        PurchaseContainer: {
            screen: ContainerPurchaseStack, navigationOptions: {
                drawerLabel: "Purchase Container(s)",
                drawerIcon: <Icon type="material-community" name="shopping" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params:  {role: ['member', 'collector']}
        },
        Containers: {
            screen: ContainerView, navigationOptions: {
                drawerLabel: "Containers",
                drawerIcon: <Icon type="material-community" name="trash-can-outline" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params:  {role: ['member', 'collector']}
        },
        SchedulePickup: {
            screen: Scheduling, navigationOptions: {
                drawerLabel: "Schedule Pickup",
                drawerIcon: <Icon type="material-community" name="car" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params:  {role: ['member', 'collector']}
        },

        LogOut: {
            screen: HomeView, navigationOptions: {
                drawerLabel: "Log Out",
                drawerIcon: <Icon type="material-community" name="keyboard-tab" color="#1F9AFC" iconStyle={styles.menuIcon}/>
            },
            params: {role: ['*']}
        },
    },
    {
        contentComponent: DrawerComponent,
        drawerType: "slide",
        initialRouteName: "Home",
    }
);



const AuthStack = createStackNavigator({
    SignIn: {
        screen: SignInView,
        navigationOptions: {
            headerShown: false
        }
    },
    SignUp: SignUpView
});

export default createAppContainer(createSwitchNavigator(
  {
    Splash: SplashView,
    Auth: AuthStack,
    App: DrawerNavigator,
  },
  {
    initialRouteName: 'Splash'
  }
));