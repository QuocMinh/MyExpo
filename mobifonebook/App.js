import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainScreen from './component/MainScreen.js';

const App = StackNavigator({
  Home: { screen: MainScreen }
});

export default App;
