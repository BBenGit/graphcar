import * as React from "react";
import { View, Text } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import FAB from "react-native-fab";
import AddFillModal from "../modal/addFill";
import styles from "./style";

import { connect } from "react-redux";

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
        <FAB
          buttonColor="#F4FF81"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            this.toggleAddFillModal();
          }}
          visible={true}
          iconTextComponent={<Icon name="add" />}
        />
        <AddFillModal
          printModal={this.state.isAddFillModalVisible}
          onDisapearCallback={this.toggleAddFillModal}
        />
        {this.props.fills.map(item => (
          <ListItem
            key={item.mileage}
            title={
              <Text style={styles.fillTitle}>
                {item.date} - {item.mileage}km
              </Text>
            }
            subtitle={
              <View style={styles.fillInfosContainer}>
                <Text style={[styles.fillInfos, styles.fillInfosLeft]}>
                  prix/litre : {item.pricePerLitre} €
                </Text>
                <Text style={[styles.fillInfos, styles.fillInfosCenter]}>
                  total : {item.amount} €
                </Text>
                <Text style={[styles.fillInfos, styles.fillInfosRight]}>
                  conso : {item.consumption ? item.consumption : "- "}l
                </Text>
              </View>
            }
            bottomDivider
          />
        ))}
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
