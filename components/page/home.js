import * as React from "react";
import { View, Dimensions } from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import FAB from "react-native-fab";
import { Icon, Text, Card } from "react-native-elements";
import { AreaChart, Grid, YAxis } from "react-native-svg-charts";
import { Path } from "react-native-svg";
import * as shape from "d3-shape";
import * as colors from "../../style/colors";

const Line = ({ line }) => (
  <Path key={"line"} d={line} stroke={colors.secondaryAccent} fill={"none"} />
);

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prices: [],
      consumptions: []
    };
  }

  // componentDidMount = () => {
  //   this.refreshData();
  // };

  // refreshData = () => {
  //   let fills = this.props.fills.filter(
  //     fill => fill.vehicle === this.props.selectedVehicle
  //   );
  //   let prices = fills.map(fill => fill.pricePerLitre);
  //   let consumptions = fills
  //     .map(fill => fill.consumption)
  //     .filter(fill => fill != null);
  //   this.setState({ prices: prices, consumptions: consumptions });
  // };

  render() {
    return (
      <View style={styles.scene}>
        {/* <FAB
          buttonColor={colors.primaryAccent}
          onClickAction={() => {
            this.refreshData();
          }}
          visible
          iconTextComponent={<Icon name="refresh" />}
        /> */}

        {this.props.fills.filter(f => f.vehicle === this.props.selectedVehicle)
          .length > 0 ? (
          <View>
            <Card>
              <Text
                style={{
                  color: colors.deepGray,
                  marginLeft: 10
                }}
              >
                Prix du carburant
              </Text>
              <View style={{ height: 200, flexDirection: "row" }}>
                <YAxis
                  data={this.props.fills
                    .filter(fill => fill.vehicle === this.props.selectedVehicle)
                    .map(fill => fill.pricePerLitre)}
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
                    .map(fill => fill.pricePerLitre)}
                  svg={{ fill: colors.secondaryAccentTransparent }}
                  contentInset={{ top: 20, bottom: 20 }}
                  curve={shape.curveNatural}
                >
                  <Grid />
                  <Line />
                </AreaChart>
              </View>
            </Card>

            <Card>
              <Text
                style={{
                  color: colors.deepGray,
                  marginLeft: 10
                }}
              >
                Consomation
              </Text>
              <View style={{ height: 200, flexDirection: "row" }}>
                <YAxis
                  data={this.props.fills
                    .filter(fill => fill.vehicle === this.props.selectedVehicle)
                    .map(fill => fill.consumption)
                    .filter(fill => fill != null)}
                  contentInset={{ top: 20, bottom: 20 }}
                  svg={{
                    fill: "grey",
                    fontSize: 10
                  }}
                  numberOfTicks={10}
                  formatLabel={value => `${value}€`}
                  style={{ paddingLeft: 10 }}
                />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <AreaChart
                    style={{ flex: 1, marginLeft: 16 }}
                    data={this.props.fills
                      .filter(
                        fill => fill.vehicle === this.props.selectedVehicle
                      )
                      .map(fill => fill.consumption)
                      .filter(fill => fill != null)}
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
    selectedVehicle: state.selectedVehicle
  };
};

export default connect(mapStateToProps)(HomePage);
