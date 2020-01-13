import React from 'react';
import { shallow } from 'enzyme';
import DrawerComponent from './DrawerComponent';
import { SafeAreaView, Text, View } from 'react-native';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<DrawerComponent />);
});

it('has SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 1 View', () => {
  expect(wrapped.find(View).length).toEqual(1);
});

it('has 2 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(2);
});

it('has a Sylvia Chen text ', () => {
  expect(wrapped.find("Text").first().props().children).toEqual('Sylvia Chen')
})