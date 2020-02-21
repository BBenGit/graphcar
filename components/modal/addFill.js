import React from "react";
import { View, Text } from "react-native";
import { Input, Button, colors } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "./styles";
import DatePicker from "react-native-datepicker";
import { prepareFill } from "../../utility";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";

const defaultState = {
  inputMileage: "",
  inputAmount: "",
  inputQuantity: "",
  inputDate: moment().format("DD/MM/YYYY")
};

class AddFillModal extends React.Component {
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

  addFill = () => {
    if (
      Boolean(this.state.inputMileage) &
      Boolean(this.state.inputAmount) &
      Boolean(this.state.inputQuantity) &
      Boolean(this.state.inputDate)
    ) {
      this.props.onAddFill(
        prepareFill(
          this.state.inputMileage,
          this.state.inputAmount,
          this.state.inputQuantity,
          this.state.inputDate
        )
      );
    }

    this.setState(defaultState);
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
            label="kilométrage."
            placeholder="36890"
            onChangeText={inputMileage => this.setState({ inputMileage })}
            value={this.state.inputMileage}
            rightIcon={<Text>km</Text>}
            keyboardType={"numeric"}
          />

          <Input
            containerStyle={styles.input}
            label="montant."
            placeholder="51.45"
            onChangeText={inputAmount => this.setState({ inputAmount })}
            value={this.state.inputAmount}
            rightIcon={<Text>€</Text>}
            keyboardType={"numeric"}
          />

          <Input
            containerStyle={styles.input}
            label="quantité."
            placeholder="37.60"
            onChangeText={inputQuantity => this.setState({ inputQuantity })}
            value={this.state.inputQuantity}
            rightIcon={<Text>L</Text>}
            keyboardType={"numeric"}
          />
          <View style={styles.buttonViewContainer}>
            <Button
              title="Ajouter plein"
              onPress={this.addFill}
              buttonStyle={styles.button}
              containerStyle={{ flex: 1 }}
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
    onAddFill: fillInfos =>
      dispatch({ type: actions.ADD_FILL, fillInfos: fillInfos })
  };
};

export default connect(null, mapDispatchToProps)(AddFillModal);
