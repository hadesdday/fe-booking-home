export const dateRangeToString = (input) => {
  if (input.from && input.to) {
    const { from, to } = input;
    const fromString = from.year + "/" + from.month + "/" + from.day;
    const toString = to.year + "/" + to.month + "/" + to.day;
    return fromString + " - " + toString;
  } else {
    return "";
  }
};

export const getNightNumber = (input) => {
  if (input.from && input.to) {
    const { from, to } = input;
    const fromString = from.month + "/" + from.day + "/" + from.year;
    const toString = to.month + "/" + to.day + "/" + to.year;
    const date1 = new Date(fromString);
    const date2 = new Date(toString);
    const diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) diffDays = 1;
    return diffDays;
  } else {
    return 1;
  }
};

export const deserializeDayToString = (input) => {
  if (input) {
    const { day, month, year } = input;
    return year + "/" + month + "/" + day;
  } else {
    return "";
  }
};

export const getDateRangeInPlainWithMonth = (input) => {
  if (input.from && input.to) {
    const { from, to } = input;
    const fromString = from.year + "/" + from.month + "/" + from.day;
    const toString = to.year + "/" + to.month + "/" + to.day;

    const d1 = new Date(fromString);
    const d2 = new Date(toString);

    const month1 = d1.toLocaleString("default", { month: "long" });
    const month2 = d2.toLocaleString("default", { month: "long" });

    const finalFromString = from.day + " " + month1 + ", " + from.year;
    const finalToString = to.day + " " + month2 + ", " + to.year;
    return finalFromString + " - " + finalToString;
  } else {
    return "";
  }
};
