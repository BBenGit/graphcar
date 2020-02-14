import * as React from "react";
import { View, Dimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { Header, Icon } from "react-native-elements";
import styles from "./style";
import * as colors from "../../style/colors";

import HomePage from "../page/home";
import FillsPage from "../page/fills";
import MaintenancePage from "../page/maintenance";
import VehicleSelection from "../modal/vehicleSelection";

import { connect } from "react-redux";

const initialLayout = { width: Dimensions.get("window").width };

class GraphCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      isVehicleSelectionModalVisible: false,
      routes: [
        { key: "home", name: "acceuil" },
        { key: "fills", name: "pleins" },
        { key: "maintenance", name: "entretien" }
      ]
    };
  }

  toggleVehicleSelectionModal = () => {
    this.setState({
      isVehicleSelectionModalVisible: !this.state.isVehicleSelectionModalVisible
    });
  };

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
    home: HomePage,
    fills: FillsPage,
    maintenance: MaintenancePage
  });

  render() {
    return (
      <View style={styles.scene}>
        <Header
          leftComponent={
            <Icon
              name="directions-car"
              reverse
              raised
              size={16}
              color={colors.deepGray}
              reverseColor={colors.primaryAccent}
              onPress={this.toggleVehicleSelectionModal}
              containerStyle={{ marginLeft: 10 }}
            />
          }
          centerComponent={{
            text: this.props.vehicles[this.props.selectedVehicle]
              ? this.props.vehicles[this.props.selectedVehicle].title
              : "graphcar."
          }}
          selected
          backgroundColor="#ECEFF1"
        />
        <TabView
          navigationState={this.state}
          renderTabBar={this.renderTabBar}
          renderScene={this.renderScene}
          onIndexChange={this.handleIndexChange}
          initialLayout={initialLayout}
        />
        <VehicleSelection
          printModal={this.state.isVehicleSelectionModalVisible}
          onDisapearCallback={this.toggleVehicleSelectionModal}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles,
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps)(GraphCar);
