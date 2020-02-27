import React, { Component } from "react";
import { Text, View, Keyboard, ActivityIndicator, TouchableWithoutFeedback} from "react-native";
import styles from './styles';
import { Icon } from "react-native-elements";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";
  import SafeAreaView from "react-native-safe-area-view";
import { FloatingTitleTextInputField } from '../../components/FloatingTitleTextInput/FloatingTitleTextInputField';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import {updateFirstName} from '../../actions/Profile/actionCreators';
import {updateLastName} from '../../actions/Profile/actionCreators';
import {exitWithoutSave} from '../../actions/Profile/actionCreators';


class NameEditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFieldActive: true,
    };
  }

  async componentDidMount() {
}

toggleBack =() => {
  this.props.navigation.navigate('EditProfile');
  this.props.exitWithoutSave
}

saveChange = () => {

  this.props.navigation.navigate('EditProfile')
}


  render() {
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
                    <Text style={styles.textTitle}>Edit Name</Text>
                </View>
            </View>
        </View>
<TouchableWithoutFeedback 
onPress={Keyboard.dismiss}>
          <View 
          style={styles.container}>
          <Animatable.View style={styles.inputContainer} animation="slideInUp">
            <View style={styles.input}>
            <FloatingTitleTextInputField
          attrName = 'firstName'
          title = 'First Name'
          value = {this.props.firstName}
          updateMasterState = {this.props.updateFirstName}
          style={styles.input}
        />

        <FloatingTitleTextInputField
          attrName = 'lastName'
          title = 'Last Name'
          value = {this.props.lastName}
          updateMasterState = {this.props.updateLastName}
          style={styles.input}
        />
        </View>
        </Animatable.View>
        <Animatable.View style={styles.btnContainer} animation="slideInUp">
            <TouchableWithoutFeedback  onPress={this.saveChange}>
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
      firstName: state.editNameReducer.firstName,
      lastName: state.editNameReducer.lastName,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        updateFirstName: (f) => dispatch(updateFirstName(f)),
        updateLastName: (l) => dispatch(updateLastName(l)),
        exitWithoutSave: () => dispatch(exitWithoutSave())
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(NameEditView);