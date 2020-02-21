const roundFloat = (float, decimalsNumber) => {
  return Number(float.toFixed(decimalsNumber));
};

const computeConsumption = (fuelQuantity, currMileage, prevMileage) => {
  return roundFloat((100 * fuelQuantity) / (currMileage - prevMileage), 2);
};

export const computeItemConsumption = (item, fills) => {
  let fillsFiltered = fills.filter(
    f => f.vehicle === item.vehicle && f.mileage < item.mileage
  );
  let previousFillMileage = fillsFiltered[fillsFiltered.length - 1]?.mileage;

  return computeConsumption(item.quantity, item.mileage, previousFillMileage);
};

export const computePricePerLitre = fill => {
  return roundFloat(parseFloat(fill.amount) / parseFloat(fill.quantity), 3);
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
  return roundFloat(totalConsumption / (fills.length - 1), 2);
};

export const computeTotalFuelAmount = fills => {
  return roundFloat(
    fills
      .map(f => f.amount)
      .reduce((accumulator, currentValue) => accumulator + currentValue),
    2
  );
};

export const computeTotalMaintenancePrice = maintenances => {
  return roundFloat(
    maintenances
      .map(m => m.price)
      .reduce((accumulator, currentValue) => accumulator + currentValue),
    2
  );
};
