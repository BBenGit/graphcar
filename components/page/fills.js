import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import FAB from "react-native-fab";

const FillsRoute = () => (
  <View style={styles.scene}>
    <FAB
      buttonColor="#F4FF81"
      iconTextColor="#FFFFFF"
      onClickAction={() => {
        console.log("FAB pressed");
      }}
      visible={true}
      iconTextComponent={<Icon name="add" />}
    />
  </View>
);

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});

export default FillsRoute;
