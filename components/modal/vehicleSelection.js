import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Input, Button, Divider, Icon, ListItem } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "./styles";
import * as colors from "../../style/colors";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

const modalMode = { Add: "Add", Select: "Select" };
const defaultState = {
  addOrSelectMode: modalMode.Select,
  inputTitle: "",
  inputDescription: ""
};

class VehicleSelection extends React.Component {
  /*
    props: {
      printModal
      onDisapearCallback
    }
  */
  constructor(props) {
    super(props);

    this.state = defaultState;
  }

  toggleMode = () => {
    if (this.state.addOrSelectMode === modalMode.Add) {
      this.setState({ addOrSelectMode: modalMode.Select });
    } else {
      this.setState({ addOrSelectMode: modalMode.Add });
    }
  };

  changeSelectedVehicle = selectedVehicle => {
    this.props.onSelectVehicle(selectedVehicle);
    this.props.onDisapearCallback();
  };

  addNewVehicle = () => {
    let vehicleInfos = {
      title: this.state.inputTitle,
      description: this.state.inputDescription
    };
    this.props.onAddVehicle(vehicleInfos);
    this.changeSelectedVehicle(vehicleInfos);
    this.setState(defaultState);
    this.props.onDisapearCallback();
  };

  renderAddVehicule = () => {
    return (
      <View>
        <Icon
          name="arrow-back"
          containerStyle={{
            alignSelf: "flex-start",
            marginBottom: 20,
            marginLeft: 5
          }}
          onPress={this.toggleMode}
        />
        <Input
          containerStyle={styles.input}
          label="titre."
          placeholder="Renault Twingo"
          onChangeText={inputTitle => this.setState({ inputTitle })}
          value={this.state.inputTitle}
        />

        <Input
          containerStyle={styles.input}
          label="description."
          placeholder="Modèle phase 1 de 1994 acheté d'occasion à 1500€ et 16000km."
          onChangeText={inputDescription => this.setState({ inputDescription })}
          value={this.state.inputDescription}
          multiline
        />
        <View style={styles.buttonViewContainer}>
          <Button
            title="Ajouter véhicule"
            onPress={this.addNewVehicle}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            raised
          />
        </View>
      </View>
    );
  };

  renderSelectVehicle = () => {
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: colors.deepGray
            }}
          >
            Selectionner un véhicule
          </Text>
          <Icon
            name="add"
            size={18}
            color={colors.primaryAccent}
            containerStyle={{
              flex: 1,
              alignItems: "flex-end"
            }}
            onPress={this.toggleMode}
            reverseColor="black"
            reverse
            raised
          />
        </View>
        {Array.isArray(this.props.vehicles) && this.props.vehicles.length ? (
          <ScrollView>
            {this.props.vehicles.map((item, index) => (
              <ListItem
                key={index}
                title={item.title}
                subtitle={item.description}
                subtitleStyle={{ color: colors.deepGray }}
                onPress={() => this.changeSelectedVehicle(item)}
                chevron
                topDivider
              />
            ))}
          </ScrollView>
        ) : (
          <Text style={{ height: 40, marginTop: 10 }}>
            Ajouter un véhicule pour commencer en appuyant sur le bouton "+".
          </Text>
        )}
      </View>
    );
  };

  render() {
    return (
      <Modal
        isVisible={this.props.printModal}
        animationIn={"zoomInDown"}
        animationOut={"zoomOutUp"}
        animationInTiming={150}
        animationOutTiming={150}
        backdropTransiitonInTiming={150}
        backdropTransiitonOutTiming={150}
        onBackdropPress={() => this.props.onDisapearCallback()}
      >
        <View style={styles.modal}>
          {this.state.addOrSelectMode === modalMode.Add
            ? this.renderAddVehicule()
            : this.renderSelectVehicle()}
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddVehicle: vehicleInfos =>
      dispatch({
        type: actions.ADD_VEHICLE,
        vehicleInfos: vehicleInfos
      }),
    onSelectVehicle: selectedVehicle =>
      dispatch({
        type: actions.SELECT_VEHICLE,
        selectedVehicle: selectedVehicle
      })
  };
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles,
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VehicleSelection);
