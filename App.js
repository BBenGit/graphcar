import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Header } from "react-native-elements";

import HomeRoute from "./components/page/home";
import FillsRoute from "./components/page/fills";
import MaintenanceRoute from "./components/page/maintenance";

const initialLayout = { width: Dimensions.get("window").width };

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "home", name: "acceuil" },
    { key: "fills", name: "pleins" },
    { key: "maintenance", name: "entretien" }
  ]);

  const renderScene = SceneMap({
    home: HomeRoute,
    fills: FillsRoute,
    maintenance: MaintenanceRoute
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={({ route }) => route.name}
      style={styles.tabbar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
    />
  );

  return (
    <View style={styles.scene}>
      <Header
        centerComponent={{ text: "graphcar.", style: { color: "#000" } }}
        backgroundColor="#ECEFF1"
      />
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  tabbar: {
    backgroundColor: "#ECEFF1"
  },
  labelStyle: {
    color: "#000"
  },
  indicatorStyle: {
    backgroundColor: "#F4FF81"
  }
});
