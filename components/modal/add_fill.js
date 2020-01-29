import React from "react";
import { View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Modal from "react-native-modal";
import { style } from "./style";

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
      inputQuantity: ""
    };
  }

  setInputValue = content => {
    this.setState({ input: content });
  };

  validateInput = () => {
    if (Boolean(this.state.input)) {
      this.props.onActionOnTaskCallback(this.state.input);
      this.setState({ input: "" });
    }
    this.props.onDisapearCallback();
  };

  addFill = () => {
    if (
      Boolean(this.state.inputMileage) &
      Boolean(this.state.inputAmount) &
      Boolean(this.state.inputQuantity)
    ) {
      let fillInfos = {
        date: moment().format("LL"),
        mileage: parseInt(this.state.inputMileage),
        amount: parseFloat(this.state.inputAmount),
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
      inputQuantity: ""
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
        <View style={style.modal}>
          <Input
            label="kilométrage."
            placeholder="36890"
            onChangeText={inputMileage => this.setState({ inputMileage })}
            value={this.state.inputMileage}
            rightIcon={<Text>km</Text>}
            keyboardType={"numeric"}
          />

          <Input
            label="montant."
            placeholder="26,75"
            onChangeText={inputAmount => this.setState({ inputAmount })}
            value={this.state.inputAmount}
            rightIcon={<Text>€</Text>}
            keyboardType={"numeric"}
          />

          <Input
            label="quantité."
            placeholder="50,43"
            onChangeText={inputQuantity => this.setState({ inputQuantity })}
            value={this.state.inputQuantity}
            rightIcon={<Text>L</Text>}
            keyboardType={"numeric"}
          />
          <View style={style.buttonViewContainer}>
            <Button
              title="Ajouter plein"
              onPress={this.addFill}
              buttonStyle={style.button}
              titleStyle={style.buttonTitle}
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
