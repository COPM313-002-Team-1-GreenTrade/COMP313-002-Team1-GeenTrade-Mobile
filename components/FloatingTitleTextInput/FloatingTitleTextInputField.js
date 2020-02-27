import React, { Component } from 'react';
import { View, Animated, TextInput, ActivityIndicator } from 'react-native';
import { string, func } from 'prop-types';
import styles from "./styles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export class FloatingTitleTextInputField extends Component {
  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string,
    updateMasterState: func.isRequired,
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
      isFocused: false,
      hasValue: false
    }
  }

  async componentDidMount() {

}

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
    
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (attrName, updatedValue) => {
    const { updateMasterState } = this.props; 
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [hp('1%'), hp('-2%')],
      }),
      fontSize: isFieldActive ? wp('3.3%') : wp('4%'),
      color: isFieldActive  ? '#74B9FF' : 'dimgrey',
    }
  }

  _returnAnimatedLineStyles = () => {
    const { isFieldActive } = this.state;
    return {
    borderBottomColor: isFieldActive ? '#74B9FF' : 'dimgrey',
    }
  }

  render() {
    return (
      <View>

      <View style = {[styles.container, this._returnAnimatedLineStyles()]}>
        <Animated.Text
          style = {[styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          style = {styles.textInput}
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          clearButtonMode = 'never'
          autoCorrect= {false}
        />
      </View>

       </View>
    )
  }
}
