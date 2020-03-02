import React, { Component } from "react";
import { View, Text, TouchableWithoutFeedback, Button } from "react-native";
import { List, ListItem, Left, Body } from 'native-base';
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase';
import { Calendar } from 'react-native-calendars';

export default class WorkSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            shiftsData: [],
            loading: true,
            isLoading: false,
            isExist: false,
            selected_work_date: '',
            selected_start_time: '',
            selected_end_time: '',
            selected_break_time: ''
        };
    }

    // Load my shifts for current month
    async componentDidMount() {
        const { navigation } = this.props;
        // refresh screen after purchasing new containers
        navigation.addListener('willFocus', () => {
            this.fetchData();
        });
    }

    fetchData = () => {
        let db = firebase.firestore();

        try {
            const shiftList = [];

            this.setState({ isLoading: true });
            db.collection("users")
                .doc(firebase.auth().currentUser.uid)
                .collection('work-schedules')
                .get().then((schedules) => {
                    if (schedules.empty) {
                        this.setState({ loading: false });
                    }
                    schedules.forEach((s) => {
                        var shift =
                        {
                            workDate: s.data().workDate,
                            startTime: s.data().startTime,
                            endTime: s.data().endTime,
                            breakTime: s.data().breakTime
                        };
                        shiftList.push(shift);

                        // console.log("shiftList ", shiftList);
                    });

                    this.setState({
                        shiftsData: shiftList,
                        loading: false,
                        isLoading: false
                    });

                    // console.log("this.state.shiftsData ", this.state.shiftsData);
                });

        } catch (error) {
            console.log(error);
        }
        finally {
            this.setState({
                isLoading: false
            });
        }
    }

    toggleShiftView = (selectedDate) => {
        this.props.navigation.navigate("Shift", {
            // year: selectedDate.year,
            // month: selectedDate.month,
            // day: selectedDate.day
            dateString: selectedDate
        });
    }

    showDetail = (selectedDate) => {
        var isExist = false;
        var selected_start_time;
        var selected_end_time;
        var selected_break_time;

        this.state.shiftsData.map(function (data, idx) {
            if (data.workDate == selectedDate.dateString) {
                // set detail for this date!
                isExist = true;
                selected_start_time = data.startTime;
                selected_end_time = data.endTime;
                selected_break_time = data.breakTime;
            }
        });
        
        // save detail information to show
        this.setState({
            isExist: isExist,
            selected_work_date: selectedDate.dateString,
            selected_start_time: selected_start_time,
            selected_end_time: selected_end_time,
            selected_break_time: selected_break_time
        });
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
                    <Calendar
                        current={this.state.date}
                        minDate={this.state.date}
                        onDayPress={(day) => { this.showDetail(day) }}
                        markedDates={obj}
                    />

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
                            <Button title="Edit Shift"/>
                        </View>
                        :
                        <Button title="Add Shift" onPress={() => {this.toggleShiftView(this.state.selected_work_date)}}/>
                    }

                </View>
            </SafeAreaView>
        );

    }
}