import React from 'react';
import { shallow } from 'enzyme';
import SignInView from './SignInView';
import { Text, View, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<SignInView />);
});

it('has 1 Keyboard Avoiding View', () => {
  expect(wrapped.find(KeyboardAvoidingView).length).toEqual(1);
});

it('has 6 Views', () => {
  expect(wrapped.find(View).length).toEqual(6);
});

it('has 2 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(2);
});

it('has 2 Buttons', () => {
  expect(wrapped.find(Button).length).toEqual(2);
});

// Check SignInView includes Sign In With Google text
it('has a Sign In With Google text ', () => {
  expect(wrapped.find("Text").last().props().children).toEqual('Sign In With Google')
})
