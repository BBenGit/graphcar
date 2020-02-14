import * as actions from "./actions";

const initialState = {
  selectedVehicle: -1,
  vehicles: [],
  fills: [],
  maintenances: []
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
  fill.vehicle = state.selectedVehicle;

  return {
    ...state,
    fills: [...state.fills, fill]
  };
};

addMaintenance = (state, maintenanceInfos) => {
  maintenanceInfos.vehicle = state.selectedVehicle;
  return {
    ...state,
    maintenances: [...state.maintenances, maintenanceInfos]
  };
};

addVehicle = (state, vehicleInfos) => {
  return {
    ...state,
    vehicles: [...state.vehicles, vehicleInfos]
  };
};

selectVehicle = (state, selectedVehicle) => {
  return {
    ...state,
    selectedVehicle: state.vehicles.indexOf(selectedVehicle)
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_FILL:
      return addFill(state, action.fillInfos);
    case actions.ADD_MAINTENANCE:
      return addMaintenance(state, action.maintenanceInfos);
    case actions.ADD_VEHICLE:
      return addVehicle(state, action.vehicleInfos);
    case actions.SELECT_VEHICLE:
      return selectVehicle(state, action.selectedVehicle);
  }
  return state;
};

export default reducer;
