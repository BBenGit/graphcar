import * as React from "react";
import { View, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Header } from "react-native-elements";
import styles from "./style";

import HomeRoute from "../page/home";
import FillsPage from "../page/fills";
import MaintenanceRoute from "../page/maintenance";

const initialLayout = { width: Dimensions.get("window").width };

export default class GraphCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: "home", name: "acceuil" },
        { key: "fills", name: "pleins" },
        { key: "maintenance", name: "entretien" }
      ]
    };
  }

  handleIndexChange = index => this.setState({ index });

  renderTabBar = props => (
    <TabBar
      {...props}
      getLabelText={({ route }) => route.name}
      style={styles.tabbar}
      labelStyle={styles.labelStyle}
      indicatorStyle={styles.indicatorStyle}
    />
  );

  renderScene = SceneMap({
    home: HomeRoute,
    fills: FillsPage,
    maintenance: MaintenanceRoute
  });

  render() {
    return (
      <View style={styles.scene}>
        <Header
          centerComponent={{ text: "graphcar." }}
          backgroundColor="#ECEFF1"
        />
        <TabView
          navigationState={this.state}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }
}
