import * as React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddFillModal from "../modal/addFill";
import styles from "./styles";

import { connect } from "react-redux";
import { black } from "../../style/colors";

class FillsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddFillModalVisible: false
    };
  }

  toggleAddFillModal = () => {
    this.setState({
      isAddFillModalVisible: !this.state.isAddFillModalVisible
    });
  };

  render() {
    return (
      <View style={styles.scene}>
        <AddFillModal
          printModal={this.state.isAddFillModalVisible}
          onDisapearCallback={this.toggleAddFillModal}
        />
        <ScrollView>
          {this.props.fills.map(item => (
            <ListItem
              key={item.mileage}
              title={
                <View style={styles.row}>
                  <View style={styles.flex3}>
                    <Text style={styles.fontSize20}>{item.mileage} km</Text>
                    <Text style={styles.grey}>{item.date}</Text>
                  </View>
                  <View style={styles.fillDescLeft}>
                    <Text style={styles.textAlignRight}>
                      {item.pricePerLitre}
                    </Text>
                    <Text style={styles.textAlignRight}>{item.amount}</Text>
                    <Text style={styles.textAlignRight}>
                      {item.consumption ? item.consumption : "? "}
                    </Text>
                  </View>
                  <View style={styles.fillDescRight}>
                    <Text style={[styles.grey, styles.textAlignLeft]}>
                      | € / litre
                    </Text>
                    <Text style={[styles.grey, styles.textAlignLeft]}>
                      | € total
                    </Text>
                    <Text style={[styles.grey, styles.textAlignLeft]}>
                      | L / 100km
                    </Text>
                  </View>
                </View>
              }
              bottomDivider
            />
          ))}
        </ScrollView>
        <FAB
          buttonColor="#F4FF81"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.toggleAddFillModal();
          }}
          visible
          iconTextComponent={<Icon name="add" />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    fills: state.fills
  };
};

export default connect(mapStateToProps)(FillsPage);
