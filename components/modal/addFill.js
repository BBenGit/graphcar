import React from "react";
import { View, Text } from "react-native";
import { Input, Button, colors } from "react-native-elements";
import Modal from "react-native-modal";
import { styles } from "./styles";
import DatePicker from "react-native-datepicker";

import { connect } from "react-redux";
import * as actions from "../../store/actions";
import moment from "moment";

class AddFillModal extends React.Component {
  /*
    props: {
      printModal
      onDisapearCallback
    }
  */
  constructor(props) {
    super(props);

    this.state = {
      inputMileage: "",
      inputAmount: "",
      inputQuantity: "",
      inputDate: moment().format("DD/MM/YYYY")
    };
  }

  addFill = () => {
    if (
      Boolean(this.state.inputMileage) &
      Boolean(this.state.inputAmount) &
      Boolean(this.state.inputQuantity)
    ) {
      let fillInfos = {
        date: this.state.inputDate,
        mileage: parseInt(this.state.inputMileage),
        amount: parseFloat(this.state.inputAmount.replace(",", ".")),
        quantity: parseFloat(this.state.inputQuantity),
        pricePerLitre:
          Math.round(
            (parseFloat(this.state.inputAmount) /
              parseFloat(this.state.inputQuantity)) *
              1000
          ) / 1000
      };

      this.props.onAddFill(fillInfos);
    }
    this.setState({
      inputMileage: "",
      inputAmount: "",
      inputQuantity: "",
      inputDate: ""
    });
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
