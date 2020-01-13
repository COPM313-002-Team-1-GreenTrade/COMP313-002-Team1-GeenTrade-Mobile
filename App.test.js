import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import DrawerNavigator from "./config/drawerNav";

import App from './App';

let wrapped;

beforeEach(() => {
  wrapped = shallow(<App />);
});

it('has DrawerNavigator', () => {
  expect(wrapped.find(DrawerNavigator).length).toEqual(1);
});