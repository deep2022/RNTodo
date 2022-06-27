import React, { useEffect, useRef, useState } from "react";
import {Animated, Dimensions, StyleSheet} from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler"
const BottomSheet = ({ show, onDismiss, children }) => {
  const bottomSheetHeight = Dimensions.get("window").height * 0.59;
  const [open, setOpen] = useState(show);
  const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;
  const onGesture = (e) => {
      bottom.setValue(-e.nativeEvent.translationY);
  };
  const onGestureEnd = (event) => {
    if (event.nativeEvent.translationY > bottomSheetHeight/2.5) {
      onDismiss();
    } 
    else {
      bottom.setValue(0);
    }
  };
  useEffect(() => {
    if (show) {
      setOpen(show);
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
        delay:300
      }).start();
    } else {
      Animated.timing(bottom, {
        toValue: -bottomSheetHeight,
        duration: 500,
        useNativeDriver: false,
      }).start(() => {
        setOpen(false);
      });
    }
  }, [show]);

  if (!open) {
    return null;
  }
  return (
      <>
      <Animated.View
        style={[
          styles.root,
          {
            height: bottomSheetHeight ,
            bottom: bottom,
          },
          styles.common,
        ]}
      >
        <PanGestureHandler onGestureEvent={onGesture} onEnded={onGestureEnd}>
          {children}
        </PanGestureHandler>
      </Animated.View>
      </>
  );
};

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
    flex:1
  },
  common: {
    elevation: 3,
  },
});

export default BottomSheet;