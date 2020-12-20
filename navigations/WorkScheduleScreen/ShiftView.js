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
            startTime: '',
            endTime: '',

            startDate: '',
            endDate: '',
            isStartDatePickerVisible: false,
            isEndDatePickerVisible: false,

            isSaved: false
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

        this.setState({
            selected_id: selected_id,
            startTime: selected_start_time,
            endTime: selected_end_time,
            breakTime: selected_break_time,
            startDate: dateString,
            endDate: dateString,
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

    handleDatePicker = (date, flag) => {
        if (flag == 'start') {
            this.setState({
                isStartDatePickerVisible: false,
                startDate: moment(date).format('YYYY-MM-DD')
            });
        } else {
            if (this.state.startDate < moment(date).format('YYYY-MM-DD')) {
                this.setState({
                    isEndDatePickerVisible: false,
                    endDate: moment(date).format('YYYY-MM-DD')
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


    showDatePicker = (flag) => {
        console.log("flag ", flag);

        if (flag == 'start') {
            this.setState({
                isStartDatePickerVisible: true
            })
        } else {
            this.setState({
                isEndDatePickerVisible: true
            })
        }
    }

    hideDatePicker = (flag) => {
        if (flag == 'start') {
            this.setState({
                isStartDatePickerVisible: false
            })
        } else {
            this.setState({
                isEndDatePickerVisible: false
            })
        }
    }

    // storing the value and passing to db
    async saveShift() {
        if (this.state.startTime == '' || this.state.endTime == '') {
            Alert.alert('Please choose your working time');
        }else if (this.state.startDate > this.state.endDate) {
            Alert.alert('Please check your begin and end working date');
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

    async save () {
        if(this.state.startDate == this.state.endDate) {
            var workScheduleRef = db.collection(`work-schedules`).doc();
            let batch = db.batch();
            batch.set(workScheduleRef, {
                workerId: firebase.auth().currentUser.uid,
                workDate: this.state.startDate,
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                breakTime: null
            });
            batch.commit();

        }else if(this.state.startDate < this.state.endDate) {
            var diffDayCount = moment(this.state.endDate).diff(this.state.startDate, 'days');
            console.log("diffDayCount : ", diffDayCount);
            
            for (let i = 0; i <= diffDayCount; i++) {
                var work_date = moment(this.state.startDate).clone().add(i, 'days');
                
                // check is there work schedule for that date
                try {
                    // this.checkWorkDate(moment(work_date).format("YYYY-MM-DD"));
                    console.log("work_date >> ", moment(work_date).format("YYYY-MM-DD"));

                    var workScheduleRef = db.collection(`work-schedules`).doc();
                    let batch = db.batch();
                    batch.set(workScheduleRef, {
                        workerId: firebase.auth().currentUser.uid,
                        workDate: moment(work_date).format("YYYY-MM-DD"),
                        startTime: this.state.startTime,
                        endTime: this.state.endTime,
                        breakTime: null
                    });
                    batch.commit();

                }catch(e) {
                    console.log("error ", e);
                }
            }
        }
        
    }

    async checkWorkDate (work_date) {
        console.log("checkWorkDate work_date ", work_date);

        db.collection('work-schedules').get().then((schedules) => {
            schedules.forEach((s) => {
                if((s.data().workerId == firebase.auth().currentUser.uid) && (s.data().workDate == work_date)){
                    console.log("this date is already saved before !!! ", work_date);
                    this.setState({
                        isSaved: true
                    });
                    console.log("11111111 this.state.isSaved >> ", this.state.isSaved);
                }
            });
        });
    }

    update = (docId) => {
        if(this.state.startDate == this.state.endDate) {
            //Ref to work-schedules
            var workScheduleRef = db.collection(`work-schedules`).doc(docId);
            let batch = db.batch();

            batch.update(workScheduleRef, {
                startTime: this.state.startTime,
                endTime: this.state.endTime,
                breakTime: null
            });
            batch.commit();
        }else {

        }
        
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
                    <ListItem style={styles.itemWrapper} onPress={(flag) => { this.showDatePicker('start') }} >
                        <Left>
                            <Text style={styles.hint}>Date Begin</Text>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.itemText}>{this.state.startDate}</Text>
                        </Body>
                        <Right style={styles.right}>
                            <Icon name='edit' type='material' color="#87D5FA" />
                        </Right>
                    </ListItem>
                </List>

                <List style={styles.listWrapper}>
                    <ListItem style={styles.itemWrapper} onPress={(flag) => { this.showDatePicker('end') }} >
                        <Left>
                            <Text style={styles.hint}>Date End</Text>
                        </Left>
                        <Body style={styles.body}>
                            <Text style={styles.itemText}>{this.state.endDate}</Text>
                        </Body>
                        <Right style={styles.right}>
                            <Icon name='edit' type='material' color="#87D5FA" />
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

                <DateTimePickerModal
                    isVisible={this.state.isStartDatePickerVisible}
                    onConfirm={(time) => { this.handleDatePicker(time, 'start') }}
                    onCancel={(flag) => { this.hideDatePicker('start') }}
                    mode={"date"}
                />

                <DateTimePickerModal
                    isVisible={this.state.isEndDatePickerVisible}
                    onConfirm={(time) => { this.handleDatePicker(time, 'end') }}
                    onCancel={(flag) => { this.hideDatePicker('end') }}
                    mode={"date"}
                />

                <Button title="Save" onPress={() => this.saveShift()} />
                <Button title="Cancel" onPress={() => this.onCancel()} />
            </SafeAreaView>
        );
    }
}