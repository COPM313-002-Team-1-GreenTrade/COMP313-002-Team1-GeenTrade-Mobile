import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { List, ListItem, Left, Body, Right } from 'native-base';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {  Icon } from "react-native-elements";
import { FloatingTitleTextInputField } from '../../components/FloatingTitleTextInput/FloatingTitleTextInputField';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';

const db = firebase.firestore();

export default class Shift extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isStartTimePickerVisible: false,
            isEndTimePickerVisible: false,
            startTime: '',
            endTime: '',
            userDisplayName: ''
        };
    }

    handleTimePicker = (time, flag) => {
        console.log("time >> ", moment(time).format('HH:mm'));
        console.log("flag ", flag);

        if (flag == 'start') {
            this.setState({
                isStartTimePickerVisible: false,
                startTime: moment(time).format('HH:mm')
            });
        } else {
            console.log("startTime >> ", this.state.startTime);
            console.log("endTime >> ", moment(time).format('HH:mm'));
            console.log("??? >> ", this.state.startTime < moment(time).format('HH:mm'));

            if (this.state.startTime < moment(time).format('HH:mm')) {
                console.log("1111");
                this.setState({
                    isEndTimePickerVisible: false,
                    endTime: moment(time).format('HH:mm')
                });
            } else {
                console.log("2222");
                Alert.alert("Please select right time to finish your work");
            }
        }
    }

    showPicker = (flag) => {
        console.log("showPicker flag ", flag);

        if (flag == 'start') {
            this.setState({
                isStartTimePickerVisible: true
            })
        } else {
            if (this.state.startTime == '') {
                Alert.alert("Please select your working start time first");
            } else {
                this.setState({
                    isEndTimePickerVisible: true
                })
            }
        }
    }

    hidePicker = (flag) => {
        console.log("hidePicker flag ", flag);

        if (flag == 'start') {
            this.setState({
                isStartTimePickerVisible: false
            })
        } else {
            this.setState({
                isEndTimePickerVisible: false
            })
        }
    }

    // storing the value and passing to db
    async saveShift(year, month, day) {
        if (this.state.startTime == '' || this.state.endTime == '') {
            Alert.alert('Please choose your working time');
        }
        else {
            //Ref to work-schedules
            var workScheduleRef = db.collection(`users/${firebase.auth().currentUser.uid}/work-schedules`).doc();

            let batch = db.batch();

            batch.set(workScheduleRef, {
                // workerFullName: this.state.userDisplayName,
                workDate: moment(new Date(year, month, day)).format('YYYY-MM-DD'),
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                breakTime: null
            });

            await batch.commit();

            Alert.alert('Your shift successfully saved !');
            this.props.navigation.goBack();
        }
    }

    onCancel = () => {
        this.props.navigation.goBack();
    }

    render() {
        /* Read the params from the navigation state (from WorkScheduleView) */
        const { params } = this.props.navigation.state;
        const year = params ? params.year : null;
        const month = params ? params.month : null;
        const day = params ? params.day : null;

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
                            <Text style={styles.textTitle}>Shift</Text>
                        </View>
                    </View>
                </View>

                <List style={styles.listWrapper}>
                    <ListItem style={styles.itemWrapper}>
                        <Left>
                            <Text style={styles.hint}>Date</Text>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.itemText}>{year}-{month}-{day}</Text>
                        </Body>
                        <Right style={styles.right}>
                            {/* <Icon name='edit' type='material' color="#87D5FA" /> */}
                        </Right>
                    </ListItem>
                </List>

                <List style={styles.listWrapper}>
                    <ListItem style={styles.itemWrapper} onPress={(flag) => { this.showPicker('start') }} >
                        <Left>
                            <Text style={styles.hint}>Start Time</Text>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.itemText}>{this.state.startTime}</Text>
                        </Body>
                        <Right style={styles.right}>
                            <Icon name='edit' type='material' color="#87D5FA" />
                        </Right>
                    </ListItem>
                </List>

                <List style={styles.listWrapper}>
                    <ListItem style={styles.itemWrapper} onPress={(flag) => { this.showPicker('end') }} >
                        <Left>
                            <Text style={styles.hint}>End Time</Text>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.itemText}>{this.state.endTime}</Text>
                        </Body>
                        <Right style={styles.right}>
                            <Icon name='edit' type='material' color="#87D5FA" />
                        </Right>
                    </ListItem>
                </List>

                <DateTimePickerModal
                    isVisible={this.state.isStartTimePickerVisible}
                    onConfirm={(time) => { this.handleTimePicker(time, 'start') }}
                    onCancel={(flag) => { this.hidePicker('start') }}
                    mode={"time"}
                    minuteInterval={5}
                />
                <DateTimePickerModal
                    isVisible={this.state.isEndTimePickerVisible}
                    onConfirm={(time) => { this.handleTimePicker(time, 'end') }}
                    onCancel={(flag) => { this.hidePicker('end') }}
                    mode={"time"}
                    minuteInterval={5}
                />

                <Button title="Save" onPress={() => this.saveShift(year, month, day)} style={styles.btnText} />
                <Button title="Cancel" onPress={() => this.onCancel()} />
            </SafeAreaView>
        );
    }
}