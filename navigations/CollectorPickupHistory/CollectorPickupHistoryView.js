import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, ActivityIndicator  } from "react-native";
import { Icon, Image, Card, ListItem  } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import 'firebase/firestore';
//import Icon1 from 'react-native-vector-icons/FontAwesome';
import firebaseConfig from '../../config/FireBaseConfig'
import firebase from '../../config/firebase'
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';

export default class CollectorPickupHistoryView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collectorHistoryData: [],
      isLoading: true,
    }

  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    try {
      const newData = [];
      var db = firebase.firestore();

      this.setState({ isLoading: true });
      db.collection("completed-pickups").doc(firebase.auth().currentUser.uid).collection("pickups").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var historyInfo =
          {
            imageUri: doc.data().imageUri,
            fulfilledTime: doc.data().fulfilledTime,
            address: doc.data().address,
            memberNotes: doc.data().memberNotes,
          };
          newData.push(historyInfo);
          this.setState({ collectorHistoryData: newData });
        });
      });
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.setState({ isLoading: false });
    }
  }

  renderSeparator = () => {
    return (
      // <View style={{  
      //   flex: 1,
      //   height: 1,
      //   backgroundColor: "#e4e4e4",
      //   marginLeft: 25,
      //   marginRight: 25,
      // }}
      //  />
      null
    );
  };

  renderItem = ({ item }) => (
    <Card
      containerStyle={styles.cardContainer}
      //title={item.address.street}
      image={{ uri: item.imageUri }}
      placeholder={<ActivityIndicator size="large" color="#00ff00" />}
      >
      <ListItem
        containerStyle={styles.cardContainer}
        title={`${item.address.street}`}
        subtitle={`Notes: ${item.memberNotes}`}
        rightSubtitle={moment(item.fulfilledTime.toDate()).format('MMM Do, h:mm a')}
      />
    </Card>
  );

  renderEmptyList = () => {
    return (
      <Text style={styles.displayMessage}>No Completed Pickups Found.</Text>
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
              <Text style={styles.textTitle}>Completed Pickups</Text>

            </View>
          </View>
        </View>
        <FlatList
          data={this.state.collectorHistoryData}
          ItemSeparatorComponent={this.renderSeparator}
          renderItem={this.renderItem}
          keyExtractor={item => item.imageUri}
          extraData={this.state}
          ListEmptyComponent={this.renderEmptyList}
          refreshing={this.state.isLoading}
          onRefresh={this.fetchData}
        >
        </FlatList>
      </SafeAreaView>
    );
  }
}