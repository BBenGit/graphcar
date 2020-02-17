export const computeConsumption = (item, fills) => {
  let fillsFiltered = fills.filter(
    f => f.vehicle === item.vehicle && f.mileage < item.mileage
  );
  let previousFillMileage = fillsFiltered[fillsFiltered.length - 1]?.mileage;

  return (
    Math.round(
      ((100 * item.quantity) / (item.mileage - previousFillMileage)) * 100
    ) / 100
  );
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
