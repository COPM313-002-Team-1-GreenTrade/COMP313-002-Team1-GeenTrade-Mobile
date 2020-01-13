import React, { Component } from "react";
import {View, Text, Image, 
    ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {Icon} from 'react-native-elements';
import { List, ListItem, Left, Body, Right} from 'native-base';
import { connect } from 'react-redux';
import {sortRewards} from '../actions/Rewards/actionCreators';
import { withNavigation, FlatList } from 'react-navigation';
import styles from '../navigations/RewardScreen/styles';
import firebaseConfig from '../config/FireBaseConfig';
import firebase from '../config/firebase'


class RewardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerUrl: '',
            rewardList: [],
        };
    }
    toggleReward (item) {
        this.props.navigation.navigate("Trade", { reward: item });
    };

    componentDidMount(){
    try {
        const rewards = [];
        var db = firebase.firestore();
        db.collection("rewards").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                var rewardInfo = {
                    brand: doc.data().brand,
                    cost: doc.data().cost,
                    imageUri: doc.data().img_url,
                    value: doc.data().value,
                    id: doc.id,
                };
                rewards.push(rewardInfo);
                // console.log(rewards)
            });
            this.setState({rewardList: rewards});
      });
      }
      catch (error){
        console.log(error);
      }
    }

    _itemLayout(data, index) {
        const width = this._itemWidth()
    
        return {
          length: width,
          offset: width * index,
          index,
        };
      }
    
      _itemWidth() {
        const { width } = Dimensions.get("window");
        return width;
      }

    renderItem = ({ item }) => ( 
      <ListItem style={styles.itemContainer}
      // When the user click speicific rewords, the user can use their potnt.
       onPress={
          () => this.toggleReward(item)} >
              <Left>
              <Image resizeMethod="resize" resizeMode='contain' style={styles.img} source={{uri: item.imageUri}}/>
              </Left>
              <Body style={styles.body}>
                <Text style={styles.rewardNameTxt}>{item.brand}</Text>
                <View style={styles.contentWrapper}>
                <View style={styles.costWrapper}>
                <Text style={styles.listPoint}>{item.cost}</Text>
                </View>
                <Text style={styles.moreTxt}>View More</Text>
                <Icon name="keyboard-arrow-right" 
                        type='material'
                        iconStyle={styles.iconGo}
                        color="#c3c3c3"
                        />
                </View>
              </Body>
            </ListItem>
      );

    render() {
        return (
            <View style={styles.scene}  >
              <FlatList
                data={this.state.rewardList}
                renderItem={this.renderItem}
                keyExtractor={item => item.id}
                style={styles.listContainer}
                extraData={this.state}
                //getItemLayout={this._itemLayout.bind(this)}
              />
            </View>
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
  
  export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(RewardList));