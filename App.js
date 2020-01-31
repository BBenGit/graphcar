import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Provider } from "react-redux";
import GraphCar from "./components/graphcar";
import { getStore, getPersistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

export default class App extends React.Component {
  renderLoading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };

  render() {
    const myStore = getStore();
    const myPersistor = getPersistor();
    return (
      <Provider store={myStore}>
        <PersistGate persistor={myPersistor} loading={this.renderLoading()}>
          <GraphCar />
        </PersistGate>
      </Provider>
    );
  }
}
