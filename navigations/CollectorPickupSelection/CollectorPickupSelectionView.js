import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, Dimensions, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import 'firebase/firestore';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig';
import firebase from '../../config/firebase';
import SlideListItem, { Separator } from "./SlideListItem";
import uuid from 'uuid';

export default class CollectorPickupSelectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collectorData: [],
      isLoading: true,
      uploadingPhoto: false,
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.fetchData();
  }

  fetchData = () => {
    try {
      let newData = [];
      var db = firebase.firestore();

      this.setState({ isLoading: true });
      db.collection("pickups")
        .where("collectorId", "==", null)
        .where("fulfilledTime", "==", null)
        .where("cancelled", "==", false)
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            var pickupInfo = {
              id: doc.id,
              memberName: doc.data().memberName,
              address: doc.data().address,
              scheduledTime: doc.data().scheduledTime,
              userId: doc.data().memberId,
              notes: doc.data().additionalInfo,
              memberProfileUri: doc.data().memberProfilePicURL,
            };
            newData.push(pickupInfo);
          });
        }).catch((error) => {
          console.log(error);
        }).finally(() => {
          this.setState({ collectorData: newData, isLoading: false });
        });
    }
    catch (error) {
      console.log(error);
    }
  }  
  
  toggleMap = (item) => {
    this.props.navigation.navigate("CollectorMap", { address: item.address, notes: item.notes });
  }

  addPickup = async (item) => {
    await this.updatePickupToDB(item);
  }

  updatePickupToDB = async (item) => {
    let db = firebase.firestore();
    let batch = db.batch();
    let currentTime = firebase.firestore.FieldValue.serverTimestamp();

    // Update pickups in client collection
    let clientPickupsRef = db.collection('users')
      .doc(item.userId)
      .collection('pickups')
      .doc(item.id);
    batch.update(clientPickupsRef, { 
      collectorId: firebase.auth().currentUser.uid, 
      collectorName: firebase.auth().currentUser.displayName
     });

    // Update pickups in pickups collection
    let pickupsRef = db.collection('pickups')
      .doc(item.id);
    batch.update(pickupsRef, { 
      collectorId: firebase.auth().currentUser.uid, 
      collectorName: firebase.auth().currentUser.displayName
    });

    await batch.commit();
  }

  renderItem = ({ item }) => (
    <SlideListItem
      item={item}
      onLeftPress={() => { this.toggleMap(item) }}
      onRightPress={() => {  this.addPickup(item) }}
    />
  );

  renderEmptyList = () => {
    return (
      <Text style={styles.displayMessage}>No Pickups Found.</Text>
    );
  }

  render() {
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
              <Text style={styles.textTitle}>Select Available Pickups</Text>
            </View>
          </View>
        </View>
        {this.state.uploadingPhoto ?
          <View style={[styles.loadingContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          :
          <FlatList
            data={this.state.collectorData}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Separator />}
            ListEmptyComponent={this.renderEmptyList}
            refreshing={this.state.isLoading}
            onRefresh={this.fetchData}
          >
          </FlatList>
        }
      </SafeAreaView>
      
    );

  }
}
