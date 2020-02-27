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
import {updateEmail} from '../../actions/Profile/actionCreators';
import {exitWithoutSave} from '../../actions/Profile/actionCreators';


class EmailEditView extends Component {
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
                    <Text style={styles.textTitle}>Edit Email</Text>
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
          attrName = 'email'
          title = 'Email'
          value = {this.props.email}
          updateMasterState = {this.props.updateEmail}
          style={styles.input}
        />

        </View>
        </Animatable.View>
        <Animatable.View style={styles.btnContainer} animation="slideInUp">
            <TouchableWithoutFeedback  onPress={this.saveName}>
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
      email: state.editEmailReducer.email,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        updateEmail: (e) => dispatch(updateEmail(e)),
        exitWithoutSave: () => dispatch(exitWithoutSave())
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EmailEditView);