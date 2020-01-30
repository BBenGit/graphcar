import * as React from "react";
import { View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddMaintenanceModal from "../modal/addMaintenance";
import styles from "./style";

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
        <FAB
          buttonColor="#F4FF81"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.toggleAddMaintenanceModal();
          }}
          visible={true}
          iconTextComponent={<Icon name="add" />}
        />
        <AddMaintenanceModal
          printModal={this.state.isAddMaintenanceModalVisible}
          onDisapearCallback={this.toggleAddMaintenanceModal}
        />
        {this.props.maintenances.map(item => (
          <ListItem
            key={item.mileage}
            title={
              <Text style={styles.fillTitle}>
                {item.title} - {item.mileage}km
              </Text>
            }
            subtitle={item.description}
            bottomDivider
          />
        ))}
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
