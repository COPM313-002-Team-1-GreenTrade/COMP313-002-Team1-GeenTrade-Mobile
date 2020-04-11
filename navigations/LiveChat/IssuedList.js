
import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    ScrollView
} from 'react-native';
import SafeAreaView from "react-native-safe-area-view";
import { Icon, List, ListItem } from 'react-native-elements';
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
            const { subject, name, issuedDate, description,status} = doc.data();
            boards.push({
                key: doc.id,
                name, // DocumentSnapshot
                subject,
                description,
                issuedDate,
                status
            });
        });
        this.setState({
            boards
        });
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    fetch = (item) => {
        console.log(item.key);
        let batch = firebase.firestore().batch();
        var ref = firebase.firestore().collection("ticket-for-cs")
       .doc(item.key)
       
       /*
       .get().then(function(doc){
           if(doc.exists){
            console.log("Document data:", doc.data());
        } else {
            console.log("No such document!");
        }
       });
*/
       console.log("<<<<<test: >>>>"+ item.key)
       console.log("testing");
       
    batch.update(ref ,{id: item.key});
      
    batch.commit()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        Alert.alert('Error', 'Please try again!');
        console.log(error);
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
                            <Text style={styles.textTitle}>Issued List</Text>
                        </View>
                    </View>
                </View>

                <ScrollView style={styles.container}>
                    {
                        this.state.boards.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.subject}
                                subtitle={item.status}
                                bottomDivider
                                leftIcon={{ name: 'heartbeat', type: 'font-awesome' }}
                                onPress={() => {
                                    this.fetch(item), this.props.navigation.navigate('DetailTicketInfo', {
                                        ticketkey: item.key,
                                    });
                                }} //`${JSON.stringify(item.key)}`
                            />
                        ))
                    }
                </ScrollView>
                <Button title="Customer Service Main Page" onPress={() => this.BackToMainPage()} />
            </SafeAreaView>
        )
    }
}