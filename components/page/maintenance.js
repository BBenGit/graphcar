import * as React from "react";
import { View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddMaintenanceModal from "../modal/addMaintenance";
import styles from "./styles";

import { connect } from "react-redux";

class MaintenancePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddMaintenanceModalVisible: false
    };
  }

  toggleAddMaintenanceModal = () => {
    this.setState({
      isAddMaintenanceModalVisible: !this.state.isAddMaintenanceModalVisible
    });
  };

  render() {
    return (
      <View style={styles.scene}>
        <AddMaintenanceModal
          printModal={this.state.isAddMaintenanceModalVisible}
          onDisapearCallback={this.toggleAddMaintenanceModal}
        />
        {this.props.maintenances.map(item => (
          <ListItem
            key={item.mileage}
            title={
              <Text>
                <Text style={[styles.fontSize20, styles.borderBottom]}>
                  {item.date}
                </Text>
                <Text style={styles.fontSize20}> / </Text>
                <Text style={[styles.fontSize20, styles.grey]}>
                  {" "}
                  {item.mileage}km
                </Text>
              </Text>
            }
            subtitle={
              <View style={styles.fillInfosContainer}>
                <Text>
                  <Text style={[styles.maintenanceTitle, styles.borderBottom]}>
                    {item.title} :{" "}
                  </Text>
                  <Text style={styles.maintenanceDescription}>
                    {item.description}
                  </Text>
                </Text>
              </View>
            }
            bottomDivider
          />
        ))}
        <FAB
          buttonColor="#F4FF81"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.toggleAddMaintenanceModal();
          }}
          visible={true}
          iconTextComponent={<Icon name="add" />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    maintenances: state.maintenances
  };
};

export default connect(mapStateToProps)(MaintenancePage);
