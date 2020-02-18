import { StyleSheet } from "react-native";
import * as colors from "../../style/colors";

export const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    padding: "5%"
  },
  buttonViewContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  icon: {
    marginRight: 5
  },
  button: {
    backgroundColor: colors.primaryAccent
  },
  alertButton: {
    backgroundColor: colors.secondaryAccent
  },
  buttonTitle: {
    color: colors.deepGray
  },
  alertButtonTitle: {
    color: "#9b0000"
  },
  input: {
    marginBottom: 20
  }
});
