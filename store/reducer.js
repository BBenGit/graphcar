import * as actions from "./actions";

const initialState = {
  fills: [],
  maintenances: [],
  fillToEdit: null,
  maintenanceToEdit: null
};

computeConsumption = (fillQuantity, fillDistance) => {
  return Math.round(((100 * fillQuantity) / fillDistance) * 100) / 100;
};

addFill = (state, fillInfos) => {
  let fill = { ...fillInfos };
  state.fills.length > 0
    ? (fill.consumption = computeConsumption(
        fillInfos.quantity,
        fillInfos.mileage - state.fills[state.fills.length - 1].mileage
      ))
    : null;

  return {
    ...state,
    fills: [...state.fills, fill]
  };
};

addMaintenance = (state, maintenanceInfos) => {
  return {
    ...state,
    maintenances: [...state.maintenances, maintenanceInfos]
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_FILL:
      return addFill(state, action.fillInfos);
    case actions.ADD_MAINTENANCE:
      return addMaintenance(state, action.maintenanceInfos);
  }
  return state;
};

export default reducer;
