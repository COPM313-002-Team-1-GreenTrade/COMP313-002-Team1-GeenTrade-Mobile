import React from 'react';
import { shallow } from 'enzyme';
import HomeView from './HomeView';
import SafeAreaView from "react-native-safe-area-view";
import {
	Image,
	Text,
	ScrollView,
	View,
	TouchableOpacity,
} from 'react-native';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<HomeView />);
});

it('has 1 SafeAreaView', () => {
  expect(wrapped.find(SafeAreaView).length).toEqual(1);
});

it('has 13 Views', () => {
  expect(wrapped.find(View).length).toEqual(13);
});

it('has 8 Texts', () => {
  expect(wrapped.find(Text).length).toEqual(8);
});

it('has 1 Image', () => {
  expect(wrapped.find(Image).length).toEqual(1);
});

it('has 1 ScrollView', () => {
  expect(wrapped.find(ScrollView).length).toEqual(1);
});

it('has 4 TouchableOpacitys', () => {
  expect(wrapped.find(TouchableOpacity).length).toEqual(4);
});

// Check Home View includes Capture Your Recyclables text
it('has a Capture Your Recyclables text ', () => {
  expect(wrapped.find("Text").last().props().children).toEqual('Capture Your Recyclables')
})