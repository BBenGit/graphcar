import { StyleSheet } from "react-native";
import * as colors from "../../style/colors";

export default styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  fillInfosContainer: {
    flexDirection: "row",
    paddingTop: 10
  },
  fillInfos: {
    flex: 1,
    color: colors.deepGray
  },
  fillInfosCenter: {
    textAlign: "center"
  },
  fillInfosLeft: {
    textAlign: "left"
  },
  fillInfosRight: {
    textAlign: "right"
  },
  fillTitle: {
    fontSize: 20
  }
});
