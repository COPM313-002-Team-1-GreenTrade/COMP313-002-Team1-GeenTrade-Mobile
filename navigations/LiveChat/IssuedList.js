
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import SafeAreaView from "react-native-safe-area-view";
import { Icon, List, ListItem, Button } from 'react-native-elements';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import styles from "./styles";
import 'firebase/firestore';
import firebase from '../../config/firebase'

export default class IssuedList extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('ticket-for-cs');
        this.unsubscribe = null;
        this.state = {
            boards: []
        };
    }
    BackToMainPage = () => {
        this.props.navigation.navigate("ContactMainView");
    }

    onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
            const { subject, name, issuedDate, Description } = doc.data();
            boards.push({
                key: doc.id,
                name, // DocumentSnapshot
                subject,
                Description,
                issuedDate,
            });
        });
        this.setState({
            boards
        });
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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
                            <Text style={styles.textTitle}>Issued List</Text>
                        </View>
                    </View>
                </View>
                <ScrollView >
                    <List>
                        {
                            this.state.boards.map((item, i) => (
                                <ListItem
                                    key={i}
                                    subject={item.subject}
                                    leftIcon={{ name: 'book', type: 'font-awesome' }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Confirmation', {
                                            boardkey: `${JSON.stringify(item.key)}`,
                                        });
                                    }}
                                />
                            ))
                        }
                    </List>
                </ScrollView>
                );
            </SafeAreaView>
        )
    }
}