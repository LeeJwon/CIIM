import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {Start} from './components/Start';
import {Takepicture} from './components/Takepicture';
import {Folder} from './components/Folder';
import {Setting} from './components/Setting';

const RootStack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <RootStack.Navigator>
      {/*options={{ headerShown: false }}*/}
      <RootStack.Screen name="Start" component={Start} options={{ headerShown: false }}/>
      <RootStack.Screen name="Takepicture" component={Takepicture}/>
      <RootStack.Screen name="Folder" component={Folder}/>
      <RootStack.Screen name="Setting" component={Setting}/>
    </RootStack.Navigator>
  </NavigationContainer>
);