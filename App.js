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

  const takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
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
          <Grid style={styles.topToolbar}>

          </Grid>
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
              size={40}
            />
            </TouchableOpacity>
          </Col>

          {/*Take picture stuff*/}
          <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={() => takePicture()}>
              <View style={[styles.captureBtn, styles.captureBtn2]}>

              </View>
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
                size={40}
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
  backgroundColor: 'black',
  height: 90,
  bottom: 0,
  },
  topToolbar: {
    width: winWidth,
    position: 'absolute',
    backgroundColor: 'black',
    height: 20,
    bottom: 647,
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 70,
    borderColor: "white",
  },
});