import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, StatusBar, Image } from 'react-native';
import { ScreenContainer } from 'react-native-screens';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export const Start = ({ navigation }) => {
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar
        hidden={false}
        barStyle={'dark-content'}
      />
      <Image
        resizeMode="contain"
        style={{ width: 275, height: 275, backgroundColor: 'white', alignContent: 'center', alignSelf: 'center'}}
        source={require('./c2m_logo.png')}
      />
    
    <ScreenContainer>
    {/* SETTINGS TAB
    <View style = {styles.setting}>
      <TouchableOpacity
              onPress={() => navigation.push("Setting")}>
            <Ionicons
              name="ios-settings"
              color="black"
              size={30}
            />
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Setting</Text>
      </View>
      </View>
      */}
      <View style = {styles.folder}>
      <TouchableOpacity
              onPress={() => navigation.push("Folder")}>
            <Ionicons
              name="ios-folder"
              color="black"
              size={70}
            />
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Load</Text>
      </View>
      <View>
        <Text style={{fontSize: 12,}}>Left and Right</Text>
      </View>
      </View>
      
      <View style = {styles.camera}>
      <TouchableOpacity
              onPress={() => navigation.push("Takepicture")}>
            <Ionicons
              name="ios-camera"
              color="black"
              size={70}
            />
      </TouchableOpacity>
      <View>
        <Text style={{fontSize: 14, fontWeight: 'bold'}}>Take Picture</Text>
      </View>
      </View>
    </ScreenContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  setting: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  camera: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  folder: {
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    backgroundColor: 'white',
  }
})
