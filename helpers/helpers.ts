import moment from "moment";

export const calculateDaysOfStay = (checkInDate: Date, checkOutDate: Date) => {
  const startDate = moment(checkInDate);
  const endDate = moment(checkOutDate);

  return endDate.diff(startDate, "days") + 1;
};

export const addCommasToAmount = (amount: string) => {
  amount = amount.toString();

  const parts = amount.split(".");

  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
};
