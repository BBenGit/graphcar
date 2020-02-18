import * as actions from "./actions";

const initialState = {
  selectedVehicle: -1,
  vehicles: [],
  fills: [],
  maintenances: []
};

addFill = (state, fillInfos) => {
  let fill = { ...fillInfos };
  fill.vehicle = state.selectedVehicle;
  return {
    ...state,
    fills: [...state.fills, fill]
  };
};

editFill = (state, fill, index) => {
  let updatedFills = [...state.fills];
  updatedFills[index] = fill;
  return {
    ...state,
    fills: updatedFills
  };
};

removeFill = (state, index) => {
  let updatedFills = [...state.fills];
  updatedFills.splice(index, 1);
  return { ...state, fills: updatedFills };
};

addMaintenance = (state, maintenanceInfos) => {
  maintenanceInfos.vehicle = state.selectedVehicle;
  return {
    ...state,
    maintenances: [...state.maintenances, maintenanceInfos]
  };
};

editMaintenance = (state, maintenance, index) => {
  let updatedMaintenances = [...state.maintenances];
  updatedMaintenances[index] = maintenance;
  return {
    ...state,
    maintenances: updatedMaintenances
  };
};

removeMaintenane = (state, index) => {
  let updatedMaintenances = [...state.maintenances];
  updatedMaintenances.splice(index, 1);
  return { ...state, maintenances: updatedMaintenances };
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
    case actions.EDIT_FILL:
      return editFill(state, action.fill, action.index);
    case actions.REMOVE_FILL:
      return removeFill(state, action.index);
    case actions.ADD_MAINTENANCE:
      return addMaintenance(state, action.maintenanceInfos);
    case actions.EDIT_MAINTENANCE:
      return editMaintenance(state, action.maintenance, action.index);
    case actions.REMOVE_MAINTENANCE:
      return removeMaintenane(state, action.index);
    case actions.ADD_VEHICLE:
      return addVehicle(state, action.vehicleInfos);
    case actions.SELECT_VEHICLE:
      return selectVehicle(state, action.selectedVehicle);
  }
  return state;
};

export default reducer;
