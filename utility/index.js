const computeConsumption = (fuelQuantity, currMileage, prevMileage) => {
  return (
    Math.round(((100 * fuelQuantity) / (currMileage - prevMileage)) * 100) / 100
  );
};

export const computeItemConsumption = (item, fills) => {
  let fillsFiltered = fills.filter(
    f => f.vehicle === item.vehicle && f.mileage < item.mileage
  );
  let previousFillMileage = fillsFiltered[fillsFiltered.length - 1]?.mileage;

  return computeConsumption(item.quantity, item.mileage, previousFillMileage);
};

export const computePricePerLitre = fill => {
  return (
    Math.round((parseFloat(fill.amount) / parseFloat(fill.quantity)) * 1000) /
    1000
  );
};

export const prepareFill = (
  inputMileage,
  inputAmount,
  inputQuantity,
  inputDate,
  vehicle
) => {
  return {
    date: inputDate,
    mileage: parseInt(inputMileage),
    amount: parseFloat(inputAmount.replace(",", ".")),
    quantity: parseFloat(inputQuantity.replace(",", ".")),
    vehicle: vehicle
  };
};

export const prepareMaintenance = (
  inputMileage,
  inputPrice,
  inputTitle,
  inputDescription,
  inputDate,
  vehicle
) => {
  return {
    date: inputDate,
    mileage: parseInt(inputMileage),
    price: parseFloat(inputPrice.replace(",", ".")),
    title: inputTitle,
    description: inputDescription,
    vehicle: vehicle
  };
};

export const computeAverageConsumption = fills => {
  let totalConsumption = 0;
  for (let i = 1; i < fills.length; i++) {
    totalConsumption += computeConsumption(
      fills[i].quantity,
      fills[i].mileage,
      fills[i - 1].mileage
    );
  }
  return Math.round((totalConsumption / (fills.length - 1)) * 100) / 100;
};

export const computeTotalFuelAmount = fills => {
  return fills
    .map(f => f.amount)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
};

export const computeTotalMaintenancePrice = maintenances => {
  return maintenances
    .map(m => m.price)
    .reduce((accumulator, currentValue) => accumulator + currentValue);
};
