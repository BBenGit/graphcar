import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddFillModal from "../modal/addFill";
import EditFillModal from "../modal/editFill";
import styles from "./styles";
import { computeConsumption, computePricePerLitre } from "../../utility";

import { connect } from "react-redux";

class FillsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isAddFillModalVisible: false,
      isEditFillModalVisible: false
    };
  }

  acceptChildMethod = childSetInputs => {
    this.childSetInputs = childSetInputs;
  };

  toggleAddFillModal = () => {
    this.setState({
      isAddFillModalVisible: !this.state.isAddFillModalVisible
    });
  };

  toggleEditFillModal = () => {
    this.setState({
      isEditFillModalVisible: !this.state.isEditFillModalVisible
    });
  };

  onListItemPressed = (item, index) => {
    this.childSetInputs(item, index);
    this.toggleEditFillModal();
  };

  render() {
    return (
      <View style={styles.scene}>
        <AddFillModal
          printModal={this.state.isAddFillModalVisible}
          onDisapearCallback={this.toggleAddFillModal}
        />
        <EditFillModal
          printModal={this.state.isEditFillModalVisible}
          onDisapearCallback={this.toggleEditFillModal}
          shareMethods={this.acceptChildMethod.bind(this)}
        />
        <ScrollView>
          {this.props.fills.map((item, index) =>
            item.vehicle === this.props.selectedVehicle ? (
              <ListItem
                key={index}
                title={
                  <View style={styles.row}>
                    <View style={styles.flex3}>
                      <Text style={styles.fontSize20}>{item.mileage} km</Text>
                      <Text style={styles.grey}>{item.date}</Text>
                    </View>
                    <View style={styles.fillDescLeft}>
                      <Text style={styles.textAlignRight}>
                        {computePricePerLitre(item)}
                      </Text>
                      <Text style={styles.textAlignRight}>{item.amount}</Text>
                      <Text style={styles.textAlignRight}>
                        {computeConsumption(item, this.props.fills) || "? "}
                      </Text>
                    </View>
                    <View style={styles.fillDescRight}>
                      <Text style={[styles.grey, styles.textAlignLeft]}>
                        | € / litre
                      </Text>
                      <Text style={[styles.grey, styles.textAlignLeft]}>
                        | € total
                      </Text>
                      <Text style={[styles.grey, styles.textAlignLeft]}>
                        | L / 100km
                      </Text>
                    </View>
                  </View>
                }
                onPress={() => this.onListItemPressed(item, index)}
                bottomDivider
              />
            ) : null
          )}
        </ScrollView>
        {this.props.selectedVehicle >= 0 ? (
          <FAB
            buttonColor="#F4FF81"
            iconTextColor="#FFFFFF"
            onClickAction={() => {
              this.toggleAddFillModal();
            }}
            visible
            iconTextComponent={<Icon name="add" />}
          />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fills: state.fills,
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps)(FillsPage);
