
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

export default class Confirmation extends Component {
    constructor(props) {
        super(props);
 }
 BackToMainPage= () => {
    this.props.navigation.navigate("ContactMainView");
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
                            <Text style={styles.textTitle}>Confirmation</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.main}>

                    <Icon iconStyle={styles.iconStyle} type="material-community" name="checkbox-multiple-marked" color="#1F9AFC" size="48" />

                    <Text style={styles.title1}> {"\n"}Thank you for contacting GreenTrade.{"\n"}
                    We've received your message.{"\n"} Please expect a delay in response during our busy period. {"\n"}
                    We are working to get back to you as soon as possible.{"\n"}
                
              </Text>
              <Button title="Customer Service Main Page" onPress={() => this.BackToMainPage()} />
                </View>
            </SafeAreaView>
        )
    }
}