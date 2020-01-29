import * as actions from "./actions";

const initialState = {
  fills: [],
  maintenance: []
};

addFill = (state, fillInfos) => {
  let fill = { ...fillInfos };
  state.fills.length > 0
    ? (fill.consumption =
        Math.round(
          ((100 * fillInfos.quantity) /
            (fillInfos.mileage - state.fills[state.fills.length - 1].mileage)) *
            100
        ) / 100)
    : null;

  return {
    ...state,
    fills: [...state.fills, fill]
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_FILL:
      return addFill(state, action.fillInfos);
  }
  return state;
};

export default reducer;
