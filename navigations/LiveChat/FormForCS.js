
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight
} from 'react-native';
import 'firebase/firestore';
import firebase from '../../config/firebase'

export default class FormForCS extends Component{
    constructor(props){
        super(props);
        this.state={
            name: null
        };
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        var user = firebase.auth().currentUser;
        var ticketData = {
            tikectId: user.uid,
            name: this.state.name,
            subject: this.state.subject,
            issuedDate: this.state.issuedDate,
            Description: this.state.description             
        }
        this.saveTicket(ticketData);
        console.log(this.state.name);
      }
    
    /*
    addTicket = (ticketData)=> {
        firebase.ref('/ticket-for-cs').push({name:ticketData});
    }
    */ 
    saveTicket = (ticketData) => {
        
        const db = firebase.firestore();
        var ticketforCS = db.collection("ticket-for-cs").doc(ticketData.tikectId);
        ticketforCS.set(ticketData);
        console.log("Ticket saved successfully");
    }

    render() {
      return (
        <View style={styles.main}>
            <Text style={styles.title}>Name:</Text>
          <TextInput
                style={styles.itemInput}
                onChangeText={name => this.setState({ name })}
                value={this.state.name}
              />
          <Text style={styles.title}>Subject:</Text>
          <TextInput
                style={styles.itemInput}
                onChangeText={subject => this.setState({ subject })}
                value={this.state.subject}
              />
         <Text style={styles.title}>Issued Date:</Text>
         <TextInput
                style={styles.itemInput}
                onChangeText={issuedDate => this.setState({ issuedDate })}
                value={this.state.issuedDate}
              />
          <Text style={styles.title}>Description:</Text>
          <TextInput
                style={styles.itemInput}
                onChangeText={description => this.setState({ description })}
                value={this.state.description}
              />
          <TouchableHighlight
                  style = {styles.button}
                  underlayColor= "white"
                  onPress = {this.handleSubmit}
                >
                <Text
                    style={styles.buttonText}>
                    Add
                </Text>
              </TouchableHighlight>
        </View>
      )
    }
  }
  const styles = StyleSheet.create({
    main: {
      flex: 1,
      padding: 30,
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#2a8ab7'
    },
    title: {
      marginBottom: 20,
      fontSize: 25,
      textAlign: 'center'
    },
    itemInput: {
      height: 50,
      padding: 4,
      marginRight: 5,
      fontSize: 23,
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 8,
      color: 'white'
    },
    buttonText: {
      fontSize: 18,
      color: '#111',
      alignSelf: 'center'
    },
    button: {
      height: 45,
      flexDirection: 'row',
      backgroundColor:'white',
      borderColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 10,
      marginTop: 10,
      alignSelf: 'stretch',
      justifyContent: 'center'
    }
  });