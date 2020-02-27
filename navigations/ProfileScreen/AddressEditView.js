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
import {updateStreet} from '../../actions/Profile/actionCreators';
import {updateCity} from '../../actions/Profile/actionCreators';
import {updateProvince} from '../../actions/Profile/actionCreators';
import {updatePostalCode} from '../../actions/Profile/actionCreators';
import {exitWithoutSave} from '../../actions/Profile/actionCreators';


class AddressEditView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFieldActive: false,
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
                    <Text style={styles.textTitle}>Edit Address</Text>
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
          attrName = 'street'
          title = 'Street'
          value = {this.props.street}
          updateMasterState = {this.props.updateStreet}
          style={styles.input}
        />

        <FloatingTitleTextInputField
          attrName = 'city'
          title = 'City'
          value = {this.props.city}
          updateMasterState = {this.props.updateCity}
          style={styles.input}
        />
        <FloatingTitleTextInputField
          attrName = 'province'
          title = 'Province'
          value = {this.props.province}
          updateMasterState = {this.props.updateProvince}
          style={styles.input}
        />
        <FloatingTitleTextInputField
          attrName = 'postalCode'
          title = 'Postal Code'
          value = {this.props.postalCode}
          updateMasterState = {this.props.updatePostalCode}
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
      street: state.editAddressReducer.street,
      city: state.editAddressReducer.city,
      province: state.editAddressReducer.province,
      postalCode: state.editAddressReducer.postalCode,
    }; 
  }
  
  function mapDispatchToProps (dispatch)  {
    return {
        updateStreet: (s) => dispatch(updateStreet(s)),
        updateCity: (c) => dispatch(updateCity(c)),
        updateProvince: (pro) => dispatch(updateProvince(pro)),
        updatePostalCode: (pos) => dispatch(updatePostalCode(pos)),
        exitWithoutSave: () => dispatch(exitWithoutSave())
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(AddressEditView);