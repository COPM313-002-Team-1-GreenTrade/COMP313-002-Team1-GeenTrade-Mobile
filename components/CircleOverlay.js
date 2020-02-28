import React, { Component } from 'react';
import { View, Image } from 'react-native';
import {Icon} from 'react-native-elements';
import styles from '../navigations/ProfileScreen/styles';




export default class CircleOverlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
                    <View style={styles.circleContainer}>
                        <Image style={styles.circle} source={{uri:'https://firebasestorage.googleapis.com/v0/b/green-trade-comp313.appspot.com/o/output-onlinepngtools%20(6).png?alt=media&token=41492567-7137-4d4a-aa48-d839ad3eaddf'}}/>
                    </View>
                            );
                        }
                    }

                      