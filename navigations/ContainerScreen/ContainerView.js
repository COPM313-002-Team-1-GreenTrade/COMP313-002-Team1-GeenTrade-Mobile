import React, { Component } from "react";
import { Text, View, StyleSheet, Button, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl, TouchableWithoutFeedback } from "react-native";
import { List, ListItem, Icon, Image } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import moment from 'moment';
import 'firebase/firestore';
import firebase from '../../config/firebase';

export default class ContainerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      containerData: [],
      loading: true,
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    // refresh screen after purchasing new containers
    navigation.addListener('willFocus', () => {
      this.fetchData();
    });
  }

  fetchData = () => {
    try {
      const newData = [];
      var db = firebase.firestore();

      this.setState({ isLoading: true});
      db.collection("users")
        .doc(firebase.auth().currentUser.uid)
        .collection('containers')
        .get().then((snapshot) => {
          if (snapshot.empty) {
            this.setState({ loading: false});
          }
          snapshot.forEach((doc) => {
            db.collection('containers').doc(doc.data().size)
              .get().then((container) => {

                var containerInfo =
                {
                  id: doc.id,
                  name: container.data().name,
                  imageUrl: container.data().img_url,
                  amount: doc.data().amount,
                  orderedDate: doc.data().orderedDate
                };
                newData.push(containerInfo);
                this.setState({ containerData: newData, loading: false, isLoading: false});
              });
          });
        });
    }
    catch (error) {
      console.log(error);
    }
    finally {
      this.setState({ isLoading: false});
    }
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#828282",
        }}
      />
    );
  };

  renderEmptyList = () => {
    return (
      <Text style={styles.displayMessage}>No Containers</Text>
    );
  }

  renderItem = ({ item }) => (
    <ListItem
      roundAvatar
      leftAvatar={{ source: { uri: item.imageUrl } }}
      title={item.name}
      subtitle={'Amount: ' + item.amount}
      rightSubtitle={moment(item.orderedDate.toDate()).format('YYYY-MM-DD hh:mm A')}
    />
  );

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
              <Text style={styles.textTitle}>Containers</Text>
            </View>
          </View>
        </View>

        {this.state.loading ?
          <ActivityIndicator size="large" style={{flex: 1}} />
          :
          <View style={styles.container}>
            <View style={styles.displayBox}>
              <Text style={styles.displayText}>Ordered Containers</Text>
            </View>
            <FlatList
              style={styles.list}
              data={this.state.containerData.sort((b,a) => (a.orderedDate.toDate() > b.orderedDate.toDate()) - (a.orderedDate.toDate() < b.orderedDate.toDate() )) }
              ItemSeparatorComponent={this.renderSeparator}
              renderItem={this.renderItem}
              keyExtractor={item => item.id}
              extraData={this.state}
              removeClippedSubviews={false}
              ListEmptyComponent={this.renderEmptyList}
              refreshing={this.state.isLoading}
              onRefresh={this.fetchData}
            />
          </View>
        }

      </SafeAreaView>
    );
  }
}
