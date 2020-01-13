import React, { Component } from "react";
import { Text, View, ActivityIndicator, StyleSheet} from "react-native";
import styles from "./styles";
import firebase from 'firebase'

export default class LoadingScreen extends Component {

    componentDidMount() {
        console.info('Loading: componentDidMount()');
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {
        console.info('Loading: checkIfLoggedIn');
        firebase.auth().onAuthStateChanged(user => 
        {
            if (user)
            {
                console.info('Loading: navigate to home');

                const db = firebase.firestore();
                var userDB = db.collection("users").doc(user.uid);
                userDB.get().then(u => {
                  if (u.exists) {
                    this.props.navigation.navigate('Home');
                  }
                });
            } 
            else {
                console.info('Loading: navigate to SignIn');
                this.props.navigation.navigate('SignIn');
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
                <Text>Loading... </Text>
            </View>
        );
    }
}
