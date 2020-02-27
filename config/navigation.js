import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import {Icon} from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import HomeView from "../navigations/HomeScreen/Container";
import RewardView from "../navigations/RewardScreen/RewardView";
import HistoryView from "../navigations/HistoryScreen/HistoryView";
import TradePointView from "../navigations/TradePointScreen/TradePointView";
import CollectorMapView from "../navigations/CollectMapScreen/container";
import CollectorPickupView from "../navigations/CollectorPickupLocationScreen/container";
import PaymentView from "../navigations/PaymentScreen/PaymentView";
import Scheduling from "../navigations/SchedulePickUp/Scheduling";
import CollectorView from "../navigations/CollectorML/CollectorView";
import RecycledItemsHistoryView from "../navigations/RecycledItemsHistoryScreen/RecycledItemsHistoryView";
import NameEditView from "../navigations/ProfileScreen/NameEditView"
import EmailEditView from "../navigations/ProfileScreen/EmailEditView"
import AddressEditView from "../navigations/ProfileScreen/AddressEditView";

const Tabs = createBottomTabNavigator(
  {
    History: {
        screen: RecycledItemsHistoryView
    },
    Home: {
        screen: HomeView 
    },
    Reward: {
        screen: RewardView
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        let iconColor;

        switch(routeName){
            case 'Home':
                iconName = `home${focused ? '' : '-outline'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
            case 'History':
                iconName = `${focused ? 'clock' : 'history'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
            case 'Reward':
                iconName = `star${focused ? '' : '-outline'}`;
                iconColor = `${focused ? '#1F9AFC' : '#87D5FA'}`;
                break;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={wp('5%')} color={iconColor} type='material-community'/>;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#1F9AFC',
      inactiveTintColor: '#87D5FA',
    },
  }
);


const StackNavigator = createStackNavigator({
  
  Home: {
    screen: Tabs
  },
  Reward: {
    screen: RewardView
},
  Trade: {
    screen: TradePointView
  },
  NameEdit: {
    screen: NameEditView
  },
  EmailEdit: {
    screen: EmailEditView
  },
  AddressEdit: {
    screen: AddressEditView
  }
},
{
  headerMode: "none", //Hide the back button react navigation
  initialRouteName: "Home",
});

export default StackNavigator;