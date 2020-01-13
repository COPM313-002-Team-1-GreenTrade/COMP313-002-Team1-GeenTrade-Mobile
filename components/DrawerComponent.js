import React, {Component} from "react";
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from "../navigations/HomeScreen/styles";
import { DrawerItems} from "react-navigation-drawer";

const DrawerComponent = (props) => (
    <SafeAreaView style={styles.container}>
            <Image
                source={require("../assets/noduck.png")}
                style={styles.profileImg}
            />
            <Text style={styles.nameTxt}>Sylvia Chen</Text>
            <Text style={styles.emailTxt}>sylviachen627@gmail.com</Text>
            <View style={styles.safeView}>
            <DrawerItems  {...props} />
        </View>
    </SafeAreaView>
);

export default DrawerComponent