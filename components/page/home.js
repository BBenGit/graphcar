import * as React from "react";
import { View, Dimensions } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import { Text, Card } from "react-native-elements";
import { AreaChart, Grid, YAxis } from "react-native-svg-charts";
import { Path } from "react-native-svg";
import * as shape from "d3-shape";
import * as colors from "../../style/colors";
import {
  computeItemConsumption,
  computePricePerLitre,
  computeTotalFuelAmount,
  computeTotalMaintenancePrice,
  computeAverageConsumption
} from "../../utility";

const Line = ({ line }) => (
  <Path key={"line"} d={line} stroke={colors.secondaryAccent} fill={"none"} />
);

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.scene}>
        {this.props.fills.filter(f => f.vehicle === this.props.selectedVehicle)
          .length > 0 ? (
          <View style={{ flex: 1, marginBottom: 20 }}>
            <Card>
              <View style={styles.row}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.textAlignLeft}>Consommation moyenne</Text>
                  <Text style={styles.textAlignLeft}>
                    Coût total de carburant
                  </Text>
                  <Text style={styles.textAlignLeft}>
                    Coût total de maintenance
                  </Text>
                </View>
                <View style={{ alignSelf: "flex-end", marginRight: 5 }}>
                  <Text style={styles.textAlignRight}>
                    {this.props.fills.filter(
                      f => f.vehicle === this.props.selectedVehicle
                    ).length > 1
                      ? computeAverageConsumption(
                          this.props.fills.filter(
                            f => f.vehicle === this.props.selectedVehicle
                          )
                        )
                      : "-"}
                  </Text>
                  <Text style={styles.textAlignRight}>
                    {this.props.fills.filter(
                      f => f.vehicle === this.props.selectedVehicle
                    ).length
                      ? computeTotalFuelAmount(
                          this.props.fills.filter(
                            f => f.vehicle === this.props.selectedVehicle
                          )
                        )
                      : "-"}
                  </Text>
                  <Text style={styles.textAlignRight}>
                    {this.props.maintenances.filter(
                      m => m.vehicle === this.props.selectedVehicle
                    ).length
                      ? computeTotalMaintenancePrice(
                          this.props.maintenances.filter(
                            m => m.vehicle === this.props.selectedVehicle
                          )
                        )
                      : "-"}
                  </Text>
                </View>
                <View style={{ alignSelf: "flex-end" }}>
                  <Text style={[styles.grey, styles.textAlignLeft]}>
                    | L / 100km
                  </Text>
                  <Text style={[styles.grey, styles.textAlignLeft]}>| €</Text>
                  <Text style={[styles.grey, styles.textAlignLeft]}>| €</Text>
                </View>
              </View>
            </Card>
            <Card containerStyle={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.deepGray,
                  marginLeft: 10
                }}
              >
                Prix du carburant
              </Text>
              <View
                style={{
                  height: "100%",
                  marginBottom: -35,
                  flexDirection: "row"
                }}
              >
                <YAxis
                  data={this.props.fills
                    .filter(fill => fill.vehicle === this.props.selectedVehicle)
                    .map(fill => computePricePerLitre(fill))}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: "grey",
                    fontSize: 10
                  }}
                  numberOfTicks={10}
                  formatLabel={value => `${value}€`}
                  style={{ paddingLeft: 10 }}
                />
                <AreaChart
                  style={{ flex: 1, marginLeft: 16 }}
                  data={this.props.fills
                    .filter(fill => fill.vehicle === this.props.selectedVehicle)
                    .map(fill => computePricePerLitre(fill))}
                  svg={{ fill: colors.secondaryAccentTransparent }}
                  contentInset={{ top: 20, bottom: 20 }}
                  curve={shape.curveNatural}
                >
                  <Grid />
                  <Line />
                </AreaChart>
              </View>
            </Card>

            <Card containerStyle={{ flex: 1 }}>
              <Text
                style={{
                  color: colors.deepGray,
                  marginLeft: 10
                }}
              >
                Consomation
              </Text>
              <View
                style={{
                  height: "100%",
                  marginBottom: -35,
                  flexDirection: "row"
                }}
              >
                <YAxis
                  data={this.props.fills
                    .filter(fill => fill.vehicle === this.props.selectedVehicle)
                    .map(fill => computeItemConsumption(fill, this.props.fills))
                    .filter(
                      consumption =>
                        consumption != undefined && !isNaN(consumption)
                    )}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: "grey",
                    fontSize: 10
                  }}
                  numberOfTicks={10}
                  formatLabel={value => `${value}L`}
                  style={{ paddingLeft: 10 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <AreaChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={this.props.fills
                      .filter(
                        fill => fill.vehicle === this.props.selectedVehicle
                      )
                      .map(fill =>
                        computeItemConsumption(fill, this.props.fills)
                      )
                      .filter(
                        consumption =>
                          consumption != undefined && !isNaN(consumption)
                      )}
                    svg={{ fill: colors.secondaryAccentTransparent }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                  >
                    <Grid />
                    <Line />
                  </AreaChart>
                </View>
              </View>
            </Card>
          </View>
        ) : (
          <Text
            style={{ color: colors.deepGray, marginTop: 50, marginLeft: 10 }}
          >
            Ajoutez des données de plein pour pouvoir voir les graphiques.
          </Text>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fills: state.fills,
    maintenances: state.maintenances,
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps)(HomePage);
