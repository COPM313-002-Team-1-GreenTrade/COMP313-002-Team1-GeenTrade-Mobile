import React, { Component } from "react";
import { View, Text, Button, Alert } from "react-native";
import { List, ListItem, Left, Body, Right } from 'native-base';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
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
            selected_id: '',
            workDate: '',
            startTime: '',
            endTime: ''
        };
    }


    // Load my shifts for current month
    async componentDidMount() {
        const { navigation } = this.props;
        // refresh screen after purchasing new containers
        navigation.addListener('willFocus', () => {
            // this.fetchData();
        });

        /* Read the params from the navigation state (from WorkScheduleView) */
        const { params } = this.props.navigation.state;
        const selected_id = params ? params.selected_id : null;
        const dateString = params ? params.dateString : null;
        const selected_start_time = params ? params.selected_start_time : null;
        const selected_end_time = params ? params.selected_end_time : null;
        const selected_break_time = params ? params.selected_break_time : null;

        console.log("componentDidMount selected_id >>>>> ", selected_id);

        this.setState({
            selected_id: selected_id,
            workDate: dateString,
            startTime: selected_start_time,
            endTime: selected_end_time,
            breakTime: selected_break_time
        })
    }

    handleTimePicker = (time, flag) => {
        if (flag == 'start') {
            this.setState({
                isStartTimePickerVisible: false,
                startTime: moment(time).format('HH:mm')
            });
        } else {
            if (this.state.startTime < moment(time).format('HH:mm')) {
                this.setState({
                    isEndTimePickerVisible: false,
                    endTime: moment(time).format('HH:mm')
                });
            } else {
                Alert.alert("Please select right time to finish your work");
            }
        }
    }

    showPicker = (flag) => {
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
    async saveShift() {
        if (this.state.startTime == '' || this.state.endTime == '') {
            Alert.alert('Please choose your working time');
        }
        else {
            var flag = '';

            try {
                if(this.state.selected_id) {
                    // update
                    flag = 'updated';
                    this.update(this.state.selected_id);
                }else {
                    // save
                    flag = 'saved';
                    this.save();
                }
            } catch (error) {
                console.log(error);
            }

            Alert.alert('Your shift successfully ' + flag + ' !');
            this.props.navigation.goBack();
        }
    }

    save = () => {
        //Ref to work-schedules
        var workScheduleRef = db.collection(`users/${firebase.auth().currentUser.uid}/work-schedules`).doc();
        let batch = db.batch();

        batch.set(workScheduleRef, {
            workDate: this.state.workDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            breakTime: null
        });
        
        batch.commit();
    }

    update = (docId) => {
        //Ref to work-schedules
        var workScheduleRef = db.collection(`users/${firebase.auth().currentUser.uid}/work-schedules`).doc(docId);
        let batch = db.batch();

        batch.update(workScheduleRef, {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            breakTime: null
        });
        
        batch.commit();
    }

    onCancel = () => {
        this.props.navigation.goBack();
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
                            <Text style={styles.itemText}>{this.state.workDate}</Text>
                        </Body>
                        <Right style={styles.right}>
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

                <Button title="Save" onPress={() => this.saveShift()} />
                <Button title="Cancel" onPress={() => this.onCancel()} />
            </SafeAreaView>
        );
    }
}