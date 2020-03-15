import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.on);

  const takePicture = async () => {
    if (this.Camera) {
        const options = {quality: 1, base64: true};
        const data = await this.Camera.takePictureAsync(options);
        console.log(data);
    }
};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <Grid style={styles.bottomToolbar}>

          {/*flashmode stuff*/}
          <Col style={styles.alignCenter}>
            <TouchableOpacity
              onPress={() => setFlash(
                flash === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              )}>
            <Ionicons
              name={flash == Camera.Constants.FlashMode.on ? "md-flash" : 'md-flash-off'}
              color="white"
              size={50}
            />
            </TouchableOpacity>
          </Col>

          {/*Take picture stuff*/}
          <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() => takePicture()}>
              <View style={[styles.captureBtn]}></View>
            </TouchableOpacity>
          </Col>

          {/*flip picture stuff*/}
          <Col style={styles.alignCenter}>
            <TouchableOpacity onPress={() => setType(
              type === Camera.Constants.Type.front
                ? Camera.Constants.Type.back
                : Camera.Constants.Type.front
            )}>
              <Ionicons
                name="md-reverse-camera"
                color="white"
                size={50}
              />
            </TouchableOpacity>
            </Col>
            
        </Grid>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  alignCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomToolbar: {
  width: winWidth,
  position: 'absolute',
  height: 100,
  bottom: 0,
  },
  captureBtn: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 80,
    borderColor: "#FFFFFF",
},
});