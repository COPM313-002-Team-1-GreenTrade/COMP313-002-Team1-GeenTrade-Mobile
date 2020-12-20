
import React, { Component } from 'react';
import {
    View,
    Alert,
    Button
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import SafeAreaView from "react-native-safe-area-view";
import { Icon, Text, Input } from 'react-native-elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import email from 'react-native-email'
import styles from "./style1";
import firebase from '../../config/firebase'
import { fetchUpdateAsync } from 'expo/build/Updates/Updates';

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const req_id = navigation.getParam("ticketkey");
        console.log(">>>>>>req_id>>>>>>" + req_id);
        this.state = {
            id: '',
            issuedDate: '',
            name: '',
            status: '',
            subject: '',
            description: '',
            selectedValue: "false",
            userEmail: '',
            ticketInfo: [{

            }],
            data: [{
                value: 'read',
                label: 'read'
            }, {
                value: 'unread',
                label: 'unread'
            }, {
                value: 'complete',
                label: 'complete'
            }, {
                value: 'EmailService',
                label: 'EmailService'
            }],
            req_id,
            getData: []
        }
        //this.handleData = this.fetchDate.bind(this);
    }
    componentWillMount() {
        console.log('Component WILL MOUNT!')

        let getId;
        let getName;
        let getSubject;
        let getIssuedDate;
        let getDescription;
        let getStaus;
        try {
            /*
                    var getData = {
                                    id: doc.data().id,
                                    issuedDate: doc.data().issuedDate,
                                    name: doc.data().name,
                                    status: doc.data().status,
                                    subject: doc.data().subject,
                                    description: doc.data().description
                                };
            */

            console.log(this.state.req_id);
            var ticketRef = firebase.firestore()
                .collection('ticket-for-cs').doc(this.state.req_id)
                .get().then(doc => {
                    if (doc.exists) {
                        if (doc.get("id") != null) {
                            getId = doc.data().id
                        }
                        if (doc.get("name") != null) {
                            getName = doc.data().name
                        }
                        if (doc.get("subject") != null) {
                            getSubject = doc.data().subject
                        }
                        if (doc.get("issuedDate") != null) {
                            getIssuedDate = doc.data().issuedDate
                        }
                        if (doc.get("description") != null) {
                            getDescription = doc.data().description
                        }
                        if (doc.get("status") != null) {
                            getStaus = doc.data().status
                        }
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log(">>>>>" + error);

                }).finally(() => {
                    this.setState({ id: getId, name: getName, status: getStaus, subject: getSubject, issuedDate: getIssuedDate, description: getDescription })
                    console.log(">>>>>success");
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    BackToMainPage = () => {
        console.log(this.state.status);
        this.props.navigation.navigate("IssuedList");

    }

    saveData = () => {
        let ticketId = this.state.id
        let batch = firebase.firestore().batch();
        var ref = firebase.firestore().collection("ticket-for-cs")
            .doc(ticketId)

        batch.update(ref, { status: this.state.status });
        batch.commit()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                Alert.alert('Error', 'Please try again!');
                console.log(error);
            });
        Alert.alert('Change Status Successful!', `Current Status of customer ${this.state.name}is:\n ${this.state.status}`);
        //this.BackToMainPage();

    }
    deleteData = () => {

        let ticketId = this.state.id
        let batch = firebase.firestore().batch();
        var ref = firebase.firestore().collection("ticket-for-cs")
            .doc(ticketId)

        batch.delete(ref);
        batch.commit()
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                Alert.alert('Error', 'Please try again!');
                console.log(error);
            });
        Alert.alert('Delete Successful!', `Ticket of customer ${this.state.name} has been deleted`);
        this.BackToMainPage();
    }


    handleEmail = () => {
        let getEmail;
        let db = firebase.firestore();
        try {
            console.log("uid:>>>>" + firebase.auth().currentUser.uid);
            db.collection("users").doc(firebase.auth().currentUser.uid)
                .get()
                .then(u => {
                    if (u.exists) {
                        if (u.get("email") != null) {
                          
                            const to = u.data().email // string or array of email addresses
                            email(to, {

                                cc: '', // string or array of email addresses
                                bcc: '', // string or array of email addresses
                                subject: '',
                                body: 'Some body right here'
                            }).catch(console.error)
                        }
                    }
                    else {
                        console.log("No such document!");
                    }
                }).catch((error) => {
                    console.log(">>>>>" + error);

                }).finally(() => {
                    this.setState({ userEmail: getEmail })
                    console.log(">>>>>success");
                });

        }
        catch (error) {
            console.log(error);
        }

    }

    render() {
        return (
            <SafeAreaView style={styles.container} >
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
                        <View style={styles.titleWrapper} >
                            <Text style={styles.textTitle}>Detail Info</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={styles.container}>

                    <Animatable.View style={styles.inputContainer} animation="slideInUp">
                        <View style={styles.input}>

                            <Icon
                                iconStyle={styles.iconStyle} type="material-community" name="checkbox-multiple-marked" color="#1F9AFC" size="48" />

                            <Input
                                label='Name'
                                value={this.state.name}
                                disabled
                                containerStyle={{ margin: '1%' }}
                            />
                            <Input
                                label='Subject'
                                value={this.state.subject}
                                disabled
                                containerStyle={{ margin: '1%' }}
                            />
                            <Input
                                label='Issued Date'
                                value={this.state.issuedDate}
                                disabled
                                containerStyle={{ margin: '1%' }}
                            />
                            <Input
                                label='Description'
                                multiline={true}
                                numberOfLines={10}
                                value={this.state.description}
                                disabled
                                containerStyle={{ margin: '1%' }}
                            />
                            <Input
                                label='Current Status'
                                value={this.state.status}
                                disabled
                                containerStyle={{ margin: '2%' }}
                            />

                            <Text style={{ margin: '2%', fontSize: '15px' }}>Change Status</Text>
                            <Dropdown

                                value={this.state.label}
                                data={this.state.data}
                                pickerStyle={{ borderBottomColor: 'transparent', borderWidth: 0 }}
                                dropdownOffset={{ 'top': 0 }}
                                containerStyle={{ width: '90%' }}
                                onChangeText={(value) => {
                                    this.setState({
                                        status: value
                                    });
                                }}
                            />


                        </View>

                    </Animatable.View>


                    <Button title="Edit Status" onPress={() => this.saveData()} />
                    <Button title="Delete" onPress={() => this.deleteData()} />
                    <Button
                        onPress={() => {
                            this.props.navigation.navigate('SendEmail', {
                                ticketkey: this.state.id,
                                issuedDate: this.state.issuedDate,
                                issue: this.state.description,
                                subject:this.state.subject
                            });
                        }}
                        title="Email Customer"
                        color="#841584"
                        accessabilityLabel="Purple Email Button"
                    />
                    <Button title="Issued List" onPress={() => this.BackToMainPage()} />
                </View>

            </SafeAreaView>
        )
    }
}