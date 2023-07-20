import React, { useRef, useEffect } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";

const AnimatedButton = ({ status }) => {
  const opacityValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const blinkingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      { iterations: -1 }
    );
    blinkingAnimation.start();

    return () => {
      blinkingAnimation.stop();
    };
  }, [opacityValue]);

  return (
    <View style={styles.container}>
      {status ? (
        <Animated.Text style={[styles.text, { opacity: opacityValue }]}>
          Active
        </Animated.Text>
      ) : (
        <Animated.Text style={[styles.textInActive, { opacity: opacityValue }]}>
          Inactive
        </Animated.Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "green",
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 15,
    fontWeight: "700",
  },
  textInActive: {
    color: "red",
    marginLeft: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default AnimatedButton;
