
import React, { Component } from 'react';
import {
    View,
    Alert,
    Button,
    TextInput
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import SafeAreaView from "react-native-safe-area-view";
import { Icon, Text, Input } from 'react-native-elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as Animatable from 'react-native-animatable';
import email from 'react-native-email'
import styles from "./style1";
import firebase from '../../config/firebase'

export default class SendEmail extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const id = navigation.getParam("ticketkey");
        const issuedDate = navigation.getParam("issuedDate");
        const issue = navigation.getParam("issue");
        const subject = navigation.getParam("subject");

        this.state = {
            issuedDate,
            issue,
            subject,
            id,
            emailSubject: 'Re: ' + subject,
            description: '',
            responseAboutIssue: '\n\n-----------------------------------------\n GreenTrade Customer Service Team \n T 416-123-4567, ext.0987'
        }

    }
    componentWillMount() {

    }

    BackToMainPage = () => {
        console.log(this.state.status);
        this.props.navigation.navigate("IssuedList");

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
                            
                            var emailData = {
                                to: u.data().email,
                                emailSubject: this.state.emailSubject,
                                responseAboutIssue: this.state.responseAboutIssue,
                                ticketId: this.state.id,
                                subject: this.state.subject,
                                issue: this.state.issue,
                                issueDate: this.state.issuedDate
                            }
                            var saveEmailinfo = db.collection("email-for-cs").doc();

                            saveEmailinfo.set(emailData);
                            console.log("Data saved successfully")

                            const to = u.data().email // string or array of email addresses
                            email(to, {
                                cc: '', // string or array of email addresses
                                bcc: '', // string or array of email addresses
                                subject: this.state.emailSubject,
                                body: this.state.responseAboutIssue
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
                                label='Subject'
                                value={this.state.emailSubject}
                                onChangeText={emailSubject => this.setState({ emailSubject })}
                                containerStyle={{ margin: '2%' }}
                            />
                            <Input
                                label='Response About Issue'
                                multiline={true}
                                numberOfLines={10}
                                onChangeText={responseAboutIssue => this.setState({ responseAboutIssue })}
                                value={this.state.responseAboutIssue}
                                containerStyle={{ margin: '1%' }}
                            />

                        </View>

                    </Animatable.View>


                    <Button
                        onPress={() => this.handleEmail()}
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