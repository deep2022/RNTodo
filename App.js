import React from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Nav from './src/navigation';
const app = () => {
  return(
    <GestureHandlerRootView style={{flex:1}}>
        <Nav />
    </GestureHandlerRootView>
  )
}

export default app;