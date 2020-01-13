import React from 'react';
import Navigator from './config/navigation';
import DrawerNavigator from "./config/drawerNav";
import combineReducers from './reducers/Index';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(combineReducers, applyMiddleware(thunkMiddleware));

export default class App extends React.Component<{}>{
  render(){
    return (
    <Provider store={store}>
      <DrawerNavigator/>
    </Provider>
    );
  }
}
