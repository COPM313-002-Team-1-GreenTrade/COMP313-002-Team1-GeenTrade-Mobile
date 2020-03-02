import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./styles";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase';
import { Calendar } from 'react-native-calendars';

export default class WorkSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    toggleShiftView = (selectedDate) => {
        console.log("var selectedDate ==> ", selectedDate);
        this.props.navigation.navigate("Shift", {
            year: selectedDate.year,
            month: selectedDate.month,
            day: selectedDate.day
        });
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
                            <Text style={styles.textTitle}>Work Schedule</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <Calendar
                        current={this.state.date}
                        minDate={this.state.date}
                        onDayPress={(day) => { this.toggleShiftView(day) }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}