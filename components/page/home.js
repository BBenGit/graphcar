import * as React from "react";
import { View, StyleSheet } from "react-native";

const HomeRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />
);

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});

export default HomeRoute;
