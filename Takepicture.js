import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, Dimensions } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { Camera } from 'expo-camera';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

const { width: winWidth, height: winHeight } = Dimensions.get('window');

export const Takepicture = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [mediaPermission, setMediaPermission] = useState(null);
  const [capturePhoto, setCapturePhoto] = useState();
  const cameraRef = useRef();
  const [cameraText, setCameraText] = useState("TAKE LEFT PICTURE");

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
      setCameraText("TAKE RIGHT PICTURE");
      //use the data of the photo to store it in the gallery
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      //display the photo taken on bottom right
      setCapturePhoto(photo.uri);
      //create an album called 'Expo' and store the photo there
      MediaLibrary.createAlbumAsync('Expo', asset);
      //this will display the photo data on the CMD
      //console.log(photo);
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
          <Grid style={styles.middleToolbar}>
          <Col style={styles.alignCenter}>
           <Text style={styles.Text_1}>{cameraText.toString()}</Text>
          </Col>
          </Grid>
          <Grid style={styles.bottomToolbar}>

          {/*flashmode stuff*/}
          <Col style={styles.alignCenter}>
            <TouchableOpacity
              onPress={() => setFlashMode(
                flashMode === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              )}>
            <Ionicons
              name={flashMode == Camera.Constants.FlashMode.on ? "md-flash" : 'md-flash-off'}
              color="white"
              size={35}
            />
            </TouchableOpacity>
          </Col>

          {/*Take picture stuff*/}
          <Col style={styles.alignCenter}>
          <TouchableOpacity
            onPress={takePhotoAndStore}>
              <View style={[styles.captureBtn]}>
                      <View style={[styles.captureBtn2]}></View>
                    </View>
            </TouchableOpacity>
          </Col>

          {/*flip picture stuff*/}
          <Col style={styles.alignCenter}>
            <TouchableOpacity 
            onPress={() => setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            )}>
              <Ionicons
                name="md-reverse-camera"
                color="white"
                size={35}
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
  height: 80,
  bottom: 0,
  },
  topToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 20,
    bottom: 647,
  },
  middleToolbar: {
    width: winWidth,
    position: 'absolute',
    height: 20,
    bottom: 80,
  },
  captureBtn: {
    width: 65,
    height: 65,
    borderWidth: 2,
    borderRadius: 65,
    borderColor: "white",
  },
  captureBtn2: {
    width: 61,
    height: 61,
    borderWidth: 2,
    borderRadius: 61,
    borderColor: "black",
    backgroundColor: "white",
  },
  Text_1: {
    color: 'white',
  },
});