import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './src/store/index'
import { useEffect } from 'react';
import {
SafeAreaView,
ScrollView,
StatusBar,
StyleSheet,
Text,
useColorScheme,
View,
Button,
Image,
PermissionsAndroid
} from 'react-native';
export default function App() {
  useEffect( () => {
      requestCameraPermission()
    })
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        ]
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the Location");
        } else {
          console.log(granted);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
// import React, {useState, useEffect} from 'react';

// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
// import {Field} from 'redux-form'

// import {
// SafeAreaView,
// ScrollView,
// StatusBar,
// StyleSheet,
// Text,
// useColorScheme,
// View,
// Button,
// Image,
// PermissionsAndroid
// } from 'react-native';

// const App = () => {
// const [imageUri, setimageUri] = useState('');
// const [imageUriGallary, setimageUriGallary] = useState('');


// const backgroundStyle = {
// backgroundColor: 'white',
// };
// useEffect( () => {
//   requestCameraPermission()
// })
// const requestCameraPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
//     ]
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log("You can use the Location");
//     } else {
//       console.log(granted);
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }
// const openCamara = () => {
// const options = {
// storageOptions: {
// path: 'images',
// mediaType: 'photo',
// },
// includeBase64: true,
// saveToPhotos: true
// };

// launchCamera(options, response => {
//   console.log(response)
// if (response.error) {
// console.log('ImagePicker Error: ', response.error);
// }
// else {
// // You can also display the image using data:
// const source = {uri: response.assets[0].uri};
// setimageUri(source);
// }
// });
// };

// const openGallery = () => {
// const options = {
// storageOptions: {
// path: 'images',
// mediaType: 'photo',
// },
// includeBase64: true,
// };

// launchImageLibrary(options, response => {
// if (response.error) {
// console.log('ImagePicker Error: ', response.error);
// } else {
// // You can also display the image using data:
// const source = {uri: response.assets[0].uri};
// setimageUriGallary(source);
// }
// });
// };
// console.log(imageUriGallary)
// return (
// <SafeAreaView style={[backgroundStyle, {flex: 1}]}>
// <View
// style={{
// justifyContent: 'center',
// alignItems: 'center',
// alignSelf: 'center',
// flex: 1,
// }}>
// <Button
// title={'Open Camera'}
// onPress={() => {
// openCamara();
// }}
// />
// <Image
// source={imageUri}
// style={{
// height: 300,
// width: 300,
// borderColor: 'black',
// }}
// />
// <Button
// title={'Open Gallery'}
// onPress={() => {
// openGallery();
// }}
// />
// <Image
// source={imageUriGallary}
// style={{
//   height: 300,
//   width: 300,
//   borderColor: 'black',
// borderColor: 'black',
// }}
// />
// </View>
// </SafeAreaView>
// );
// };
// export default App;