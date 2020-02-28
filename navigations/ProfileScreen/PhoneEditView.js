import React, { Component } from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback} from "react-native";
import styles from './styles';
import { Icon } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
import SafeAreaView from "react-native-safe-area-view";
import firebase from '../../config/firebase';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {updatePhone} from '../../actions/Profile/actionCreators';
import PhoneInput from "react-native-phone-input";

class PhoneEditView extends Component {
    constructor(props) {
    super(props);

    this.state = {
      isFieldActive: true,
    };
  }

async componentDidMount() {
    console.log(this.props.email)
}

toggleBack =() => {
  this.props.navigation.goBack(null)
  this.props.exitWithoutSave
}

handleInputChange = phone => {
    //   if (/^\d+$/.test(phone) || phone === "") {
    //     this.setState({ phone });
    //   }
      var cleaned = ('' + phone).toString().replace(/\D/g, '')
      var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
      if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        this.setState({
            phone: number
        });
        return;
      }
    }

saveChange = (phone) => {
    this.props.phone;
    let db = firebase.firestore();
    let batch = db.batch();

    //Ref to user
    let userRef = db.collection('users').doc(firebase.auth().currentUser.uid);
    batch.update(userRef, { phone: phone });

    batch.commit()
      .then((result) => {
        this.props.navigation.goBack(null)
      })
      .catch((error) => {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
        console.log(error);
      });
  }

  render() {
    const PhoneInputTextProps = {
        placeholder:`${this.props.phone}`,
        placeholderTextColor: "#000000",
      };
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <View style={styles.iconWrapper}>
                    <TouchableWithoutFeedback onPress={() => this.toggleBack()}>
                    <Icon
                        type="material"
                        name="keyboard-arrow-left"
                        size={30}
                        color="#fff"
                        containerStyle={styles.drawerIcon}
                    />
                    </TouchableWithoutFeedback>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.textTitle}>Edit Phone</Text>
                </View>
            </View>
        </View>
<TouchableWithoutFeedback 
onPress={Keyboard.dismiss}>
          <View 
          style={styles.container}>
         <Animatable.View
                    animation="slideInUp"
                    style={styles.phoneListContainer}
                  >
                      <PhoneInput
                        style={styles.phoneList}
                        pickerBackgroundColor="#fffdf2"
                        textStyle={{  }}
                        textProps={PhoneInputTextProps}
                        initialCountry={"ca"}
                        onChangePhoneNumber={this.props.updatePhone
                        }
                        autoFormat={true}
                        offset={wp("4%")}
                        disabled={false}
                      />
                  </Animatable.View>
        <Animatable.View style={styles.btnContainer} animation="slideInUp">
            <TouchableWithoutFeedback  onPress={() =>this.saveChange(this.props.phone)}>
              <View style={styles.btn}>
              <Text style={styles.btnText}>SAVE    CHANGE</Text>
              </View>
            </TouchableWithoutFeedback>
            </Animatable.View>
          </View>
          </TouchableWithoutFeedback>
          </SafeAreaView>
    );
  }
}

function mapStateToProps (state){
    return{
      phone: state.editPhoneReducer.phone,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        updatePhone: (p) => dispatch(updatePhone(p)),
    };
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(PhoneEditView);