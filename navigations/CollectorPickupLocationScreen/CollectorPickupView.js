import React, { Component } from "react";
import { Text, View, FlatList, ActivityIndicator, Dimensions, SafeAreaView, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import 'firebase/firestore';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig';
import firebase from '../../config/firebase';
import moment from 'moment';
import SlideListItem, { Separator } from "./SlideListItem";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import uuid from 'uuid';

export default class CollectorPickupView extends Component {
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
    // navigation.addListener('willFocus', () => {
    //   if (this.state.requireDataUpdate) {
    //     this.fetchData();
    //   }
    // });
    this.fetchData();
  }

  fetchData = () => {
    try {
      //this.setState({ collectorData: []});
      let newData = [];
      var db = firebase.firestore();

      this.setState({ isLoading: true });
      db.collection("pickups")
        .where("collectorId", "==", firebase.auth().currentUser.uid)
        .where("fulfilledTime", "==", null)
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

  archivePickup = async (item) => {
    await Permissions.askAsync(Permissions.CAMERA);
    let cameraPhoto = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
    });
    await this.processPickupPhoto(cameraPhoto, item);
  }

  processPickupPhoto = async (photo, item) => {
    this.setState({ uploadingPhoto: true });
    try {
      let storageImageUri = await this.uploadImageAsync(photo.uri);
      await this.savePickupToDB(storageImageUri, item);
    }
    catch(error) {
      console.log(error);
    }
    finally {
      this.setState({ uploadingPhoto: false });
      this.fetchData();
    }
  }

  savePickupToDB = async (uri, item) => {
    let db = firebase.firestore();
    let totalEstimatedPoints = 0;

    await db.collection('recycled-items')
      .where('userId', '==', item.userId)
      .where('collected', '==', false)
      .where('cancelled', '==', false)
      .get()
      .then((snapshots) => {
        snapshots.forEach((doc) => {
          totalEstimatedPoints += doc.data().estimatedPoints;
          db.collection('recycled-items').doc(doc.id).update({ collected: true });
        });
      });

    let batch = db.batch();
    let currentTime = firebase.firestore.FieldValue.serverTimestamp();

    // Add to completed-pickups
    let completedRef = db.collection('completed-pickups')
      .doc(firebase.auth().currentUser.uid)
      .collection('pickups')
      .doc(item.id);
    batch.set(completedRef, { 
      fulfilledTime: currentTime, 
      imageUri: uri, 
      address: {
        street: item.address.street,
        city: item.address.city,
        province: item.address.province,
        postalCode: item.address.postalCode,
      },
      memberNotes: item.notes,
    });

    // Update pickups in client collection
    let clientPickupsRef = db.collection('users')
      .doc(item.userId)
      .collection('pickups')
      .doc(item.id);
    batch.update(clientPickupsRef, { fulfilledTime: currentTime });

    // Update pickups in pickups collection
    let pickupsRef = db.collection('pickups')
      .doc(item.id);
    batch.update(pickupsRef, { fulfilledTime: currentTime });

    // Update client points
    let clientRef = db.collection('users')
      .doc(item.userId);
    batch.update(clientRef, { points: firebase.firestore.FieldValue.increment(totalEstimatedPoints)});

    await batch.commit();
  }

  uploadImageAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError('Network request failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });

    const ref = firebase
      .storage()
      .ref()
      .child(uuid.v4());
    await ref.put(blob);
    blob.close();
    return await ref.getDownloadURL();
  }

  renderItem = ({ item }) => (
    <SlideListItem
      item={item}
      onLeftPress={() => { this.toggleMap(item) }}
      onRightPress={() => {  this.archivePickup(item) }}
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
              <Text style={styles.textTitle}>Track Pickups</Text>
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
