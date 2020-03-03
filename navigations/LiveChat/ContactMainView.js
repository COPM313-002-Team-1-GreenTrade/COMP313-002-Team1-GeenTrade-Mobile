
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    TouchableHighlight
} from 'react-native';
import SafeAreaView from "react-native-safe-area-view";
import { Icon } from 'react-native-elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./styles";
import 'firebase/firestore';

export default class ContactMainView extends Component {
    constructor(props) {
        super(props);
    }

    navigateFormPage = () => {
        this.props.navigation.navigate("ContactUsForm");
    }
    navigateListPage = () => {
        this.props.navigation.navigate("IssuedList");
    }
    navigateLiveChatPage = () => {
        this.props.navigation.navigate("LiveChat");
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
                            <Text style={styles.textTitle}>Customer Service</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.main}>

                    <Icon iconStyle={styles.iconStyle} type="material-community" name="gesture-tap-hold" color="#1F9AFC" size="48" />

                    <Text style={styles.title1}> {"\n"}Customer Exprience{"\n"} </Text>
                    <Button
                        title="Contact Us Form"
                        type="clear"
                        onPress={this.navigateFormPage}
                    />
                    <Button
                        title="Issued List"
                        type="clear"
                        onPress={this.navigateListPage}
                    />
                        <Button
                        title="Live Chat"
                        type="clear"
                        onPress={this.navigateLiveChatPage}
                    />
                </View>
            </SafeAreaView>
        )
    }
}