import React, { Component } from "react";
import { Text, View, Image, Alert } from "react-native";
import { Icon, Button } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from "../../config/firebase";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { fetchUpdateAsync } from "expo/build/Updates/Updates";

export default class TradePointlView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: '',
      isLoading: true,
      totalPoints: 0,
      selectedReward: {},
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ isLoading: true });
    let db = firebase.firestore();
    const reward = this.props.navigation.getParam('reward');
    this.setState({ selectedReward: reward });
    db.collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapShot) => {
        this.setState({ 
          displayName: snapShot.data().displayName,
          totalPoints: snapShot.data().points, 
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  redeemReward = async (userPoints, selectedReward) => {
    let db = firebase.firestore();
    let rewardCode = null;
    if (this.state.totalPoints < this.state.selectedReward.cost) {
      Alert.alert('Error', `You don't have enough points to redeem this!`);
      return;
    }
    await db.collection('rewards')
      .doc(this.state.selectedReward.id)
      .collection('codes')
      .where('used', '==', false)
      .limit(1)
      .get()
      .then((snapShot) => {
        snapShot.forEach(doc => {
          rewardCode = doc.id
        });
      });
    if (!rewardCode) {
      Alert.alert('Error', 'We are out of stock. Please try again later.');
      return;
    }
    else {
      this.saveToDB(rewardCode, selectedReward);
    }
  }

  saveToDB = (code, selectedReward) => {
    let db = firebase.firestore();
    let batch = db.batch();

    // Ref to rewards collection
    let rewardRef = db.collection('rewards').doc(selectedReward.id).collection('codes').doc(code);
    batch.update(rewardRef, { used: true });

    // Ref to users' code collection
    let userCodeRef = db.collection('users').doc(firebase.auth().currentUser.uid).collection('codes').doc(code);
    batch.set(userCodeRef, {
      brand: selectedReward.brand,
      code: code,
      redeemDate: firebase.firestore.FieldValue.serverTimestamp(),
      url: selectedReward.imageUri,
    })

    //Ref to user
    let userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    batch.update(userRef, { points: firebase.firestore.FieldValue.increment(-1 * selectedReward.cost) });

    batch.commit()
      .then((result) => {
        Alert.alert('Success', `Succesully redeemed! Your code is ${code}.`);
        this.props.navigation.pop();
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
        console.log(error);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.iconWrapper}>
              <TouchableWithoutFeedback 
              onPress={() => this.props.navigation.goBack(null)}>
                <Icon
                  type="material"
                  name="keyboard-arrow-left"
                  size={30}
                  color="#fff"
                  containerStyle={styles.drawerIcon}
                />
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.titleWrapper}>
              <Text style={styles.textTitle}>Redeem Rewards</Text>
            </View>
          </View>
        </View>
        <View style={styles.welcomeWrapper}>
          <Text style={styles.welcomeTxt}>
            {this.state.displayName} : {this.state.totalPoints} points
          </Text>
        </View>
        <View style={styles.rewardInfo}>
          <Image
            borderRadius={5}
            resizeMethod="resize"
            resizeMode="contain"
            style={styles.img}
            source={{ uri: this.state.selectedReward.imageUri }}
          />
        </View>

        <View style={styles.point}>
          <Button
            disabled={true}
            disabledStyle={{ backgroundColor: "white" }}
            disabledTitleStyle={{ color: "black", left: 10, fontSize: 20 }}
            title={this.state.selectedReward.cost.toString()}
            icon={
              <Icon
                iconStyle={{ left: 10 }}
                type="font-awesome"
                name="star"
                color="#e1b225"
              />
            }
          />
        </View>
        <View style={styles.usePoint}>
          <Button
            disabled={this.state.selectedReward.cost > this.state.totalPoints}
            buttonStyle={{ backgroundColor: "#da272a", marginTop: 20 }}
            titleStyle={{ color: "white", fontSize: 25 }}
            title="REDEEM"
            iconRight={true}
            onPress={() =>
              this.redeemReward(this.state.totalPoints, this.state.selectedReward)
            }
          />
        </View>
      </SafeAreaView>
    );
  }
}
