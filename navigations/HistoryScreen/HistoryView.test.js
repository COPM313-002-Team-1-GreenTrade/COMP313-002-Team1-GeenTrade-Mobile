import React from 'react';
import { shallow } from 'enzyme';
import HistoryView from './HistoryView';
import SafeAreaView from "react-native-safe-area-view";
import { Text, View } from "react-native";

let wrapped;

beforeEach(() => {
  wrapped = shallow(<HistoryView />);
});

it('has SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 4 Views', () => {
  expect(wrapped.find(View).length).toEqual(4);
});

it('has 1 Text', () => {
  expect(wrapped.find(Text).length).toEqual(1);
});

it('has a History text ', () => {
  expect(wrapped.find("Text").last().props().children).toEqual('History')
})