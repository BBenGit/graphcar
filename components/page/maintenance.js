import * as React from "react";
import { View, StyleSheet } from "react-native";

const MaintenanceRoute = () => (
  <View style={[styles.scene, { backgroundColor: "#5e3375" }]} />
);

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});

export default MaintenanceRoute;
