import React from "react";
import { Text } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
import GraphCar from "./components/graphcar";

const store = createStore(reducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <GraphCar />
      </Provider>
    );
  }
}
