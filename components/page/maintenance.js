import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddMaintenanceModal from "../modal/addMaintenance";
import EditMaintenanceModal from "../modal/editMaintenance";
import styles from "./styles";
import * as colors from "../../style/colors";

import { connect } from "react-redux";

class MaintenancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddMaintenanceModalVisible: false,
      isEditMaintenanceModalVisible: false
    };
  }

  acceptChildMethod = childSetInputs => {
    this.childSetInputs = childSetInputs;
  };

  toggleAddMaintenanceModal = () => {
    this.setState({
      isAddMaintenanceModalVisible: !this.state.isAddMaintenanceModalVisible
    });
  };

  toggleEditMaintenanceModal = () => {
    this.setState({
      isEditMaintenanceModalVisible: !this.state.isEditMaintenanceModalVisible
    });
  };

  onListItemPressed = (item, index) => {
    this.childSetInputs(item, index);
    this.toggleEditMaintenanceModal();
  };

  render() {
    return (
      <View style={styles.scene}>
        <AddMaintenanceModal
          printModal={this.state.isAddMaintenanceModalVisible}
          onDisapearCallback={this.toggleAddMaintenanceModal}
        />
        <EditMaintenanceModal
          printModal={this.state.isEditMaintenanceModalVisible}
          onDisapearCallback={this.toggleEditMaintenanceModal}
          shareMethods={this.acceptChildMethod.bind(this)}
        />
        <ScrollView>
          {this.props.maintenances
            .filter(m => m.vehicle === this.props.selectedVehicle)
            .map((item, index) => (
              <ListItem
                key={index}
                title={
                  <View style={{ flexDirection: "row" }}>
                    <View
                      style={{
                        borderBottomColor: colors.deepGray,
                        borderBottomWidth: 1
                      }}
                    >
                      <Text style={styles.fontSize20}>{item.date}</Text>
                    </View>
                    <Icon
                      name="timeline"
                      containerStyle={{ marginHorizontal: 10 }}
                    />
                    <Text style={[styles.fontSize20, styles.grey]}>
                      {item.mileage}km
                    </Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }}>
                      <View
                        style={{
                          backgroundColor: colors.deepGray,
                          alignItems: "center",
                          justifyContent: "center",
                          borderTopLeftRadius: 10,
                          borderBottomRightRadius: 10,
                          paddingVertical: 2,
                          paddingHorizontal: 8
                        }}
                      >
                        <Text style={{ color: "white", fontSize: 18 }}>
                          {item.price} €
                        </Text>
                      </View>
                    </View>
                  </View>
                }
                subtitle={
                  <View style={styles.fillInfosContainer}>
                    <Text>
                      <Text style={styles.maintenanceTitle}>{item.title} </Text>
                      <Text style={styles.maintenanceDescription}>
                        {item.description}
                      </Text>
                    </Text>
                  </View>
                }
                onPress={() => this.onListItemPressed(item, index)}
                bottomDivider
              />
            ))}
        </ScrollView>
        {this.props.selectedVehicle >= 0 ? (
          <FAB
            buttonColor="#F4FF81"
            iconTextColor="#FFFFFF"
            onClickAction={() => {
              this.toggleAddMaintenanceModal();
            }}
            visible={true}
            iconTextComponent={<Icon name="add" />}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    maintenances: state.maintenances,
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps)(MaintenancePage);
