import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Camera } from 'expo-camera';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.on);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [capturePhoto, setCapturePhoto] = useState();
  const cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setMediaPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePhotoAndStore(){
    if(cameraRef){
      //photo will be the image taken by user
      let photo = await cameraRef.current.takePictureAsync();
      //use the data of the photo to store it in the gallery
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      //display the photo taken on bottom right
      setCapturePhoto(photo.uri);
      //create an album called 'Expo' and store the photo there
      MediaLibrary.createAlbumAsync('Expo', asset);
      //this will display the photo data on the CMD
      console.log(photo);
    }
  }
  
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type} ref={cameraRef} flashMode={flashMode}>
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
              onPress={() => setFlashMode(
                flashMode === Camera.Constants.FlashMode.on
                  ? Camera.Constants.FlashMode.off
                  : Camera.Constants.FlashMode.on
              )}>
            <Ionicons
              name={flashMode == Camera.Constants.FlashMode.on ? "md-flash" : 'md-flash-off'}
              color="white"
              size={40}
            />
            </TouchableOpacity>
          </Col>

          {/*Take picture stuff*/}
          <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={takePhotoAndStore}>
              <View style={[styles.captureBtn, styles.captureBtn2]}>
              </View>
            </TouchableOpacity>
          </Col>

          {/*flip picture stuff*/}
          <Col style={styles.alignCenter}>
            <TouchableOpacity 
            onPress={() => setType(
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