import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Button, Alert } from "react-native";
import { List, ListItem, Left, Body } from 'native-base';
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

export default class WorkSchedule extends Component {

    constructor(props) {
        super(props);

        var tomorrow = new Date();
        //add a day to the date
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.state = {
            date: new Date(),
            minDate: tomorrow,
            shiftsData: [],
            isExist: false,
            selected_work_date: '',
            selected_start_time: '',
            selected_end_time: '',
            selected_break_time: '',
            pickUpsData: [],
            workingArea: ''
        };
    }

    // Load my shifts for current month
    async componentDidMount() {
        const { navigation } = this.props;
        // refresh screen after purchasing new containers
        navigation.addListener('willFocus', () => {
            this.fetchData();
        });

        this.setState({
            isExist: false
        });
    }

    fetchData = () => {
        let db = firebase.firestore();
        try {
            // work schedule
            const shiftList = [];
            db.collection('work-schedules')
                .get()
                .then((schedules) => {
                    schedules.forEach((s) => {
                        if (s.data().workerId == firebase.auth().currentUser.uid) {
                            var shift =
                            {
                                selected_id: s.id,
                                workDate: s.data().workDate,
                                startTime: s.data().startTime,
                                endTime: s.data().endTime,
                                breakTime: s.data().breakTime
                            };
                            shiftList.push(shift);
                            // console.log("shiftList ", shiftList);
                        }
                    });

                    this.setState({
                        shiftsData: shiftList
                    });

                    // console.log("this.state.shiftsData ", this.state.shiftsData);
                });

            // assigned pickup
            var pickupList = [];
            db.collection("pickups")
                .get()
                .then((pickups) => {
                    pickups.forEach((pickup) => {
                        if (pickup.data().collectorId == firebase.auth().currentUser.uid) {
                            if (pickup.data().scheduledTime != null) {
                                var pickup =
                                {
                                    // scheduledTime: s.data().scheduledTime
                                    key: pickup.id,
                                    scheduledDate: moment(pickup.data().scheduledTime.toDate()).format('YYYY-MM-DD'),
                                    scheduledTime: moment(pickup.data().scheduledTime.toDate()).format('hh:mm A'),
                                };
                                pickupList.push(pickup);
                            }
                        }
                    });

                    console.log("pickupList>>> ", pickupList);

                    this.setState({
                        pickUpsData: pickupList
                    });
                });

            // get working area
            db.collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((doc) => {
                this.setState({ workingArea: doc.data().workingArea });
            });

        } catch (error) {
            console.log(error);
        }
    }

    toggleShiftView = (selectedDate) => {
        if (this.state.pickUpsData.some(item => selectedDate === item.scheduledDate)) {
            Alert.alert("You have assigned pickup schedule !");
        } else {
            this.props.navigation.navigate("Shift", {
                selected_id: this.state.selected_id,
                dateString: selectedDate,
                selected_start_time: this.state.selected_start_time,
                selected_end_time: this.state.selected_end_time,
                selected_break_time: this.state.selected_break_time
            });
        }
    }

    showDetail = (selectedDate) => {
        var isExist = false;
        var selected_start_time;
        var selected_end_time;
        var selected_break_time;
        var selected_id;

        this.state.shiftsData.map(function (data, idx) {
            if (data.workDate == selectedDate.dateString) {
                // set detail for this date!
                isExist = true;
                selected_id = data.selected_id;
                selected_start_time = data.startTime;
                selected_end_time = data.endTime;
                selected_break_time = data.breakTime;
            }
        });

        // if there are no shift, just redirect to shift view
        if (!isExist) {
            this.props.navigation.navigate("Shift", {
                selected_id: '',
                dateString: selectedDate.dateString,
                selected_start_time: '',
                selected_end_time: '',
                selected_break_time: ''
            });
        } else {
            // save detail information to show
            this.setState({
                selected_id: selected_id,
                isExist: isExist,
                selected_work_date: selectedDate.dateString,
                selected_start_time: selected_start_time,
                selected_end_time: selected_end_time,
                selected_break_time: selected_break_time
            });
        }

    }

    deleteShift = (selectedDate) => {
        // check pickup schedule exist or not
        // console.log("CHECK>>>>>> ", this.state.pickUpsData.some(item => selectedDate === item.scheduledDate));
        if (this.state.pickUpsData.some(item => selectedDate === item.scheduledDate)) {
            Alert.alert("You have assigned pickup schedule !");
        } else {
            // delete selected shift
            try {
                // firebase.database().ref('work-schedules').child(this.state.selected_id).remove();
                let db = firebase.firestore();
                db.collection("work-schedules").doc(this.state.selected_id).delete().then(function () {
                    Alert.alert('Your shift successfully removed !');
                });

                // get new schdule list and hide detail view
                this.fetchData();
                this.setState({
                    isExist: false
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    render() {
        // marking dates for calendar
        const renObjData = this.state.shiftsData.map(function (data, idx) {
            return data.workDate;
        });
        const obj = renObjData.reduce((c, v) => Object.assign(c, { [v]: { selected: false, marked: true } }), {});

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
                            <Text style={styles.textTitle}>Work Schedule</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.welcomeWrapper}>
                        <Text style={styles.welcomeTxt}>Assigned Area: {this.state.workingArea}</Text>
                    </View>
                    <Calendar
                        current={this.state.date}
                        minDate={this.state.minDate}
                        onDayPress={(day) => { this.showDetail(day) }}
                        markedDates={obj}
                    />
                    <Text>{"\n"}</Text>


                    {this.state.isExist === true ?
                        <View>
                            <View style={styles.welcomeWrapper}>
                                <Text style={styles.welcomeTxt}>Schedule Detail</Text>
                            </View>
                            <List style={styles.listWrapper}>
                                <ListItem style={styles.itemWrapper}>
                                    <Left>
                                        <Text style={styles.hint}>Date</Text>
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.itemText}>{this.state.selected_work_date}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                            <List style={styles.listWrapper}>
                                <ListItem style={styles.itemWrapper}>
                                    <Left>
                                        <Text style={styles.hint}>Time</Text>
                                    </Left>
                                    <Body style={styles.body}>
                                        <Text style={styles.itemText}>{this.state.selected_start_time} ~ {this.state.selected_end_time}</Text>
                                    </Body>
                                </ListItem>
                            </List>
                            <List style={styles.listWrapper}>
                                <ListItem style={styles.itemWrapper}>
                                    <Left>
                                        <Text style={styles.hint}>Assigned Pickup</Text>
                                    </Left>
                                    <Body style={styles.body}>

                                        <View>
                                            {this.state.pickUpsData.map((data, i) => {
                                                if (data.scheduledDate == this.state.selected_work_date) {
                                                    return (
                                                        <Text style={styles.itemText} key={i}>{data.scheduledTime}</Text>
                                                    );
                                                }
                                            })}
                                        </View>
                                    </Body>
                                </ListItem>
                            </List>
                            <Button title="Edit" onPress={() => { this.toggleShiftView(this.state.selected_work_date) }} />
                            <Button title="Delete" onPress={() => { this.deleteShift(this.state.selected_work_date) }} />
                        </View>
                        :
                        <View>
                        </View>
                    }
                </View>
            </SafeAreaView>
        );

    }
}