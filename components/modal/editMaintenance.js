import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "./styles";
import DatePicker from "react-native-datepicker";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { prepareMaintenance } from "../../utility";

class EditMaintenanceModal extends React.Component {
  /*
    props: {
      printModal
      onDisapearCallback
      shareMethods
    }
  */
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.shareMethods(this.setInputs.bind(this));
  }

  setInputs = (maintenance, index) => {
    this.setState({
      inputMileage: maintenance.mileage.toString(),
      inputPrice: maintenance.price.toString(),
      inputTitle: maintenance.title,
      inputDescription: maintenance.description,
      inputDate: maintenance.date,
      vehicle: maintenance.vehicle,
      maintenanceIndex: index
    });
  };

  editMaintenance = () => {
    if (Boolean(this.state.inputMileage) & Boolean(this.state.inputTitle)) {
      this.props.onEditMaintenance(
        prepareMaintenance(
          this.state.inputMileage,
          this.state.inputPrice,
          this.state.inputTitle,
          this.state.inputDescription,
          this.state.inputDate,
          this.state.vehicle
        ),
        this.state.maintenanceIndex
      );
    }
    this.props.onDisapearCallback();
  };

  removeMaintenance = () => {
    this.props.onRemoveMaintenance(this.state.maintenanceIndex);
    this.props.onDisapearCallback();
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
          <Input
            containerStyle={styles.input}
            label="date."
            inputComponent={() => (
              <DatePicker
                style={{
                  width: "100%"
                }}
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    alignItems: "flex-start"
                  },
                  dateText: {
                    fontSize: 18
                  },
                  dateIcon: {
                    marginRight: 0
                  }
                }}
                date={this.state.inputDate}
                mode="date"
                format="DD/MM/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                // showIcon={false}
                onDateChange={inputDate => this.setState({ inputDate })}
              />
            )}
          />

          <Input
            containerStyle={styles.input}
            label="titre."
            placeholder="Vidange"
            onChangeText={inputTitle => this.setState({ inputTitle })}
            value={this.state.inputTitle}
          />

          <Input
            containerStyle={styles.input}
            label="kilométrage."
            placeholder="36890"
            onChangeText={inputMileage => this.setState({ inputMileage })}
            value={this.state.inputMileage}
            rightIcon={<Text>km</Text>}
            keyboardType={"numeric"}
          />

          <Input
            containerStyle={styles.input}
            label="prix."
            placeholder="35.99"
            onChangeText={inputPrice => this.setState({ inputPrice })}
            value={this.state.inputPrice}
            rightIcon={<Text>€</Text>}
            keyboardType={"numeric"}
          />

          <Input
            containerStyle={styles.input}
            label="description."
            placeholder="Changement cartouche à huile et huile 10w40."
            onChangeText={inputDescription =>
              this.setState({ inputDescription })
            }
            value={this.state.inputDescription}
            multiline
          />
          <View style={styles.buttonViewContainer}>
            <Button
              title="Supprimer entretien"
              onPress={this.removeMaintenance}
              buttonStyle={styles.alertButton}
              titleStyle={styles.alertButtonTitle}
              raised
            />
            <View style={{ flex: 1 }} />
            <Button
              title="Mettre à jour"
              onPress={this.editMaintenance}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
              raised
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onEditMaintenance: (maintenance, index) =>
      dispatch({
        type: actions.EDIT_MAINTENANCE,
        maintenance: maintenance,
        index: index
      }),
    onRemoveMaintenance: index =>
      dispatch({
        type: actions.REMOVE_MAINTENANCE,
        index: index
      })
  };
};

export default connect(null, mapDispatchToProps)(EditMaintenanceModal);
