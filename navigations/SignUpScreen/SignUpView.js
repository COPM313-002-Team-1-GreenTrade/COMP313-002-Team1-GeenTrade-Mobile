import React, { Component } from "react";
import { SafeAreaView, Image, Text, View, TextInput, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import { Dialog } from 'react-native-simple-dialogs';
import { Divider, Icon } from "react-native-elements";
import styles from "./styles";
import * as Google from 'expo-google-app-auth';
import googleLogInConfig from '../../config/OAuthClientConfig';
import 'firebase/firestore';
import firebase from '../../config/firebase'

export default class SignUpView extends Component {

  DEFAULT_PHOTO_URI = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: '',
      successDialogVisible: false,
      province: 'ON'
    };
  }

  //sign up using email and password
  onEmailSignUp = () => {
    if (!this.validateInputs()) {
      this.refs._scrollView.scrollTo({x:0, y:0});
      return;
    }

    this.setState({
      loading: true,
      error: ''
    });
    const { email, password } = this.state;
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        console.log('>>> save: ' + JSON.stringify(user));

        var userData = {
          uid: user.user.uid,
          providerId: user.user.providerData[0].providerId,
          email: user.user.providerData[0].email,
          displayName: this.state.firstName + ' ' + this.state.lastName,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: {
            city: this.state.city,
            postalCode: this.state.postalCode,
            province: this.state.province,
            street: this.state.address
          }
        }
        this.saveGoogleUser(userData);
      })
      .catch((error) => {
        console.info(error.message);
        this.setState({ loading: false, error: error.message });
      });
  };
  //save google user to firestore db
  saveGoogleUser = (userData) => {
    const db = firebase.firestore();
    var user = db.collection("users").doc(userData.uid);
    user.get().then(doc => {
      //update
      if (doc.exists) {
        user.update({
          lastLoginAt: Date.now()
        }).then(function (snapshot) {
          console.log('Updated Snapshot', snapshot);
          this.setState({ loading: false, error: '' });
        })
      }
      //insert
      else {
        userData.type = 'member';
        userData.deleted = false;
        userData.points = 0;
        userData.profilePhoto = userData.profilePhoto ? userData.profilePhoto: this.DEFAULT_PHOTO_URI;

        user.set(userData)
          .then((snapshot) => {
            console.log('User Inserted');
            this.setState({ loading: false, error: '' });
            this.showSuccessDialog();
            firebase.auth().currentUser.sendEmailVerification();            
          })
      }
    });
  };
  validateInputs = () => {

    var emailInvalid = !this.validateEmail(this.state.email)
    this.setState({emailInvalid: emailInvalid});

    var emailRequired = typeof this.state.email == 'undefined' || !this.state.email;
    this.setState({emailRequired: emailRequired});

    var passwordRequired = typeof this.state.password == 'undefined' || !this.state.password;
    this.setState({passwordRequired: passwordRequired});

    var firstNameRequired = typeof this.state.firstName == 'undefined' || !this.state.firstName;
    this.setState({firstNameRequired: firstNameRequired});

    var lastNameRequired = typeof this.state.lastName == 'undefined' || !this.state.lastName;
    this.setState({lastNameRequired: lastNameRequired});

    var addressRequired = typeof this.state.address == 'undefined' || !this.state.address;
    this.setState({addressRequired: addressRequired});

    var cityRequired = typeof this.state.city == 'undefined' || !this.state.city;
    this.setState({cityRequired: cityRequired});

    var provinceRequired = typeof this.state.province == 'undefined' || !this.state.province;
    this.setState({provinceRequired: provinceRequired});

    var postalCodeRequired = typeof this.state.postalCode == 'undefined' || !this.state.postalCode;
    this.setState({postalCodeRequired: postalCodeRequired});

    return !emailInvalid && !emailRequired && !passwordRequired && !firstNameRequired && !lastNameRequired && 
           !addressRequired && !cityRequired && !provinceRequired && !postalCodeRequired;
  }
  validateEmail = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return expression.test(String(email).toLowerCase())
  }
  onCancel = () => {
    this.props.navigation.goBack();
  }
  showSuccessDialog = () => {
    this.setState({ successDialogVisible: true })
  }
  renderCurrentState() {
    if (this.state.loading) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
    if (firebase.auth().currentUser !== null) {
      return (
        <View style={styles.form}>
          <Dialog
            title="Welcome!"
            animationType="fade"
            contentStyle={styles.dialogContent}
            titleStyle={styles.centeredText}
            onTouchOutside={() => this.props.navigation.navigate('Home')}
            visible={this.state.successDialogVisible}>

            <Image style={styles.successImage} source={require('../../assets/success-icon.jpg')} />
            <Text style={styles.dialogMessage} >
              Your registration has been successfully completed.
            </Text>
            <Button
              style={styles.dialogButton}
              onPress={() => this.props.navigation.navigate('Home')}
              title="Continue"
            />
          </Dialog>
        </View>
      )
    }
    return (
      <SafeAreaView style={styles.containerView}>

        <KeyboardAvoidingView style={styles.containerView} keyboardVerticalOffset={100} behavior="padding">
          <ScrollView ref='_scrollView'>

            <View>
              <Text style={styles.logoText}>Create Account</Text>
              <Text style={styles.ErrorTextStyle}>{this.state.error}</Text>

              <Text style={styles.label}>Email</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="email-outline" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your email" placeholderColor="#c4c3cb" autofocus
                  textContentType="emailAddress" keyboardType="email-address" autoCompleteType="email"
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
              </View>
              {!!this.state.emailRequired && <Text style={styles.ErrorTextStyle}>Email is required</Text>}
              {!!this.state.emailInvalid && <Text style={styles.ErrorTextStyle}>Email format is invalid</Text>}

              <Text style={styles.label}>Password</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="lock-question" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your password" placeholderColor="#c4c3cb" autofocus
                  textContentType="newPassword" secureTextEntry={true}
                  onChangeText={password => this.setState({ password })}
                  value={this.state.password}
                />
              </View>
              {!!this.state.passwordRequired && <Text style={styles.ErrorTextStyle}>Password is required</Text>}

              <Text style={styles.label}>First Name</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="account-box" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your first name" placeholderColor="#c4c3cb" autofocus
                  textContentType="givenName" keyboardType="default" autoCompleteType="name"
                  onChangeText={firstName => this.setState({ firstName })}
                  value={this.state.firstName}
                />
              </View>
              {!!this.state.firstNameRequired && <Text style={styles.ErrorTextStyle}>First Name is required</Text>}

              <Text style={styles.label}>Last Name</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="account-box" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your last name" placeholderColor="#c4c3cb" autofocus
                  textContentType="familyName" keyboardType="default" autoCompleteType="name"
                  onChangeText={lastName => this.setState({ lastName })}
                  value={this.state.lastName}
                />
              </View>
              {!!this.state.lastNameRequired && <Text style={styles.ErrorTextStyle}>Last Name is required</Text>}

              <Text style={styles.label}>Address</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="map-marker" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your address" placeholderColor="#c4c3cb" autofocus
                  textContentType="fullStreetAddress" keyboardType="default" autoCompleteType="street-address"
                  onChangeText={address => this.setState({ address })}
                  value={this.state.address}
                />
              </View>
              {!!this.state.addressRequired && <Text style={styles.ErrorTextStyle}>Address is required</Text>}

              <Text style={styles.label}>City</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="map-marker" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your city" placeholderColor="#c4c3cb" autofocus
                  textContentType="addressCity" keyboardType="default"
                  onChangeText={city => this.setState({ city })}
                  value={this.state.city}
                />
              </View>
              {!!this.state.cityRequired && <Text style={styles.ErrorTextStyle}>City is required</Text>}

              <Text style={styles.label}>Province</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="map-marker" iconStyle={styles.icon} />
                <Picker
                  title={"Select a province"}
                  selectedValue={this.state.province}
                  style={{ height: 40, width: 310 }}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ province: itemValue })
                  }>
                  <Picker.Item label="Ontario" value="ON" />
                  <Picker.Item label="British Columbia" value="BC" />
                </Picker>
              </View>
              {!!this.state.provinceRequired && <Text style={styles.ErrorTextStyle}>Province is required</Text>}

              <Text style={styles.label}>Postal Code</Text>
              <View style={styles.inputView}>
                <Icon type="material-community" name="map-marker" iconStyle={styles.icon} />
                <TextInput style={styles.inputText} placeholder="Enter your postal code" placeholderColor="#c4c3cb" autofocus
                  textContentType="postalCode" keyboardType="default"
                  onChangeText={postalCode => this.setState({ postalCode })}
                  value={this.state.postalCode}
                />
              </View>
              {!!this.state.postalCodeRequired && <Text style={styles.ErrorTextStyle}>Postal Code is required</Text>}

              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onEmailSignUp()}
                title="Register"
              />
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => this.onCancel()}
                title="Cancel"
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
    );
  }
}
