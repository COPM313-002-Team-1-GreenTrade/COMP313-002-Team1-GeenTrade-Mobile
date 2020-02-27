
import React from 'react';
import {View, Text, Image, 
    ScrollView, ActivityIndicator,
TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import SafeAreaView from "react-native-safe-area-view";
import styles from './styles';
import {Icon} from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TabBar } from 'react-native-tab-view';
import RewardList from '../../components/RewardList';
import RewardHistory from '../../components/RewardHistory';
import { connect } from 'react-redux';
import {sortRewards} from '../../actions/Rewards/actionCreators';
import firebase from '../../config/firebase';

const RewardListRoute = () => <RewardList/>

const RewardHistoryRoute = () => <RewardHistory/>

class RewardView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    };
    this.marginLeft = new Animated.Value(wp('10%'));
  }

componentDidMount() {
  const { navigation } = this.props;
  // refresh screen on focus
  navigation.addListener('willFocus', () => {
    this.fetchData();
  });
}

fetchData = () => {
  try {
    var db = firebase.firestore();
    var user = db.collection("users").doc(firebase.auth().currentUser.uid);
            user.get().then(u => {
              if (u.exists) {
                 this.setState({user: u.data()});
                 //console.log(this.state);
                }
            });	
  }
  catch (error) {
    console.log(error);
  }
}

_handleIndexChange = index => {
  if(!isNaN(index))
  {
    this.props.sortRewards(index)
  }
    
    //console.log(index)
}

_renderTabBar = props => {

    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
         <View style={styles.header}>
         <View style={styles.iconWrapper}>
         <TouchableWithoutFeedback onPress={() => this.props.navigation.openDrawer()}>
							<Icon
								type="material"
								name="menu"
								size={30}
								color="#fff"
								containerStyle={styles.drawerIcon}
							/>
							</TouchableWithoutFeedback>
         </View>
         <View style={styles.titleWrapper}>
             <Text style={styles.textTitle}>Rewards</Text>
         </View>
         </View>
     </View>
     <View style={styles.topContainer}>
     <Icon name='star' type='material-community' color='#FBDFAA' iconStyle={styles.starIcon}/>
     <View style={styles.pointContainer}>
     <Text style={styles.pointText}>{this.state.user.points}</Text>
     </View>
     <Image resizeMethod="resize" source={{uri:'https://cdn.dribbble.com/users/1281708/screenshots/4676637/____dribbble.gif'}} style={styles.headerImg}/>
          <TabBar
          {...props}
         indicatorStyle={styles.indocator}
         style={styles.tabBar}
         tabStyle={styles.tab}
         labelStyle={[styles.tabText]}
         onTabPress={this._handleIndexChange}
        />
        
        </View>
            </SafeAreaView>
    );
  };

  _renderScene = SceneMap({
    rewardList: RewardListRoute,
    rewardHistory: RewardHistoryRoute,
  });

    render() {

        return(
            <TabView
            navigationState={this.props.navigationState}
            renderScene={this._renderScene}
            renderTabBar={this._renderTabBar}
            onIndexChange={this._handleIndexChange}
          >
          </TabView>
        );
    }
}

function mapStateToProps (state){
    return{
      navigationState: state.sortRewardsReducer,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        sortRewards: (index) => dispatch(sortRewards(index)),
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(RewardView);