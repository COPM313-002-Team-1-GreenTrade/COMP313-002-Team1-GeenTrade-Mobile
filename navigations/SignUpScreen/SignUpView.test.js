import React from 'react';
import { shallow } from 'enzyme';
import SignUpView from './SignUpView';
import { SafeAreaView, Text, View, TextInput, ScrollView, KeyboardAvoidingView} from 'react-native';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<SignUpView />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 10 Views', () => {
  expect(wrapped.find(View).length).toEqual(10);
});

it('has 10 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(10);
});

it('has 7 TextInputs', () => {
  expect(wrapped.find(TextInput).length).toEqual(7);
});

it('has 1 ScrollView', () => {
  expect(wrapped.find(ScrollView).length).toEqual(1);
});

it('has 1 KeyboardAvoidingView', () => {
  expect(wrapped.find(KeyboardAvoidingView).length).toEqual(1);
});