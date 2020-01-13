import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Icon, ListItem }  from "react-native-elements";
import moment from 'moment';
//import { GestureHandler } from 'expo';
//const { Swipeable } = GestureHandler;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 20,
        justifyContent: 'center',
    },
    text: {
        color: "#4a4a4a",
        fontSize: 16,
    },
    separator: {
        flex: 1,
        height: 1,
        backgroundColor: "#e4e4e4",
        marginLeft: 25,
        marginRight: 25,
    },
    swipeIcons: {
        color: '#fff',
        padding: 25,
    },
    leftAction: {
        backgroundColor: '#994d00',
        justifyContent: 'center',
    },
    rightAction: {
        backgroundColor: '#990099',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export const Separator = () => <View style={styles.separator} />;

const LeftActions = ({progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1.5],
        extrapolate: 'clamp',
    })
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.leftAction}>
                <Animated.View style={{ transform: [{ scale }]}}>
                    <Icon
                        type="material-community"
                        name="google-maps"
                        size={30}
                        iconStyle={styles.swipeIcons}
                    />
                </Animated.View>          
            </View>
        </TouchableOpacity>
    )
};

const RightActions = ({ progress, dragX, onPress }) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1.5, 0],
        extrapolate: 'clamp',
    })
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.rightAction}>
                <Animated.View style={{ transform: [{ scale }]}}>
                    <Icon
                        type="material-community"
                        name="camera"
                        size={30}
                        iconStyle={styles.swipeIcons}
                    />
                </Animated.View>     
            </View>
        </TouchableOpacity>
    )
};

const SlideListItem = ({ item, onLeftPress, onRightPress }) => (
    <Swipeable
        renderLeftActions={(progress, dragX) => <LeftActions progress={progress} dragX={dragX} onPress={onLeftPress} />}
        renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX} onPress={onRightPress} />}
    >
        <ListItem
                leftAvatar={{ rounded: true, source: { uri: item.memberProfileUri } }}
                title={item.memberName}
                subtitle={item.address.street}
                rightSubtitle={moment(item.scheduledTime.toDate()).format('MMM Do, h:mm a')}
            />
    </Swipeable>
);

export default SlideListItem;