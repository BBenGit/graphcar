import { StyleSheet } from "react-native";
import * as colors from "../../style/colors";

export default styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  fillInfosContainer: {
    flexDirection: "row",
    paddingTop: 10,
    alignItems: "baseline"
  },
  fillInfos: {
    flex: 1,
    color: colors.deepGray
  },
  fontSize20: {
    fontSize: 20
  },
  maintenanceDescription: {
    color: colors.deepGray
  },
  maintenanceTitle: {
    fontSize: 20
  },
  grey: {
    color: colors.deepGray
  },
  row: {
    flexDirection: "row"
  },
  fillDescLeft: {
    flex: 1,
    paddingRight: 5
  },
  fillDescRight: {
    flex: 1
  },
  textAlignRight: {
    textAlign: "right"
  },
  textAlignLeft: {
    textAlign: "left"
  },
  flex3: { flex: 3 }
});
