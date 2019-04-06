import moment from "moment";

export const isDateTimeValid = dateTime => moment(dateTime).isValid();
