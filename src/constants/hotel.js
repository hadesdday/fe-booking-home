export const BOOKING_RESOURCE = "booking";
export const REPORT_RESOURCE = "reports";
export const HOTEL_RESOURCE = "hotel";

export const FETCH_GOOD_HOTEL_LIST = "findHotelGood";
export const FETCH_RESERVED_DATE = BOOKING_RESOURCE + "/findReservedByHotel";

export const ADD_TO_CART = "addToCart";
export const GET_CART = "cart";
export const DELETE_ITEM_FROM_CART = GET_CART + "/delete";

export const BOOKING_HOTEL = BOOKING_RESOURCE + "/bookingByClient";

export const REPORT_HOTEL = REPORT_RESOURCE + "/add";

export const FETCH_BOOKING_HISTORY_EMAIL =
  BOOKING_RESOURCE + "/getBookingHistoryByEmail";
export const FETCH_BOOKING_HISTORY_USERNAME =
  BOOKING_RESOURCE + "/getBookingHistoryByUsername";

export const FETCH_HOTEL_LIST_DISCOUNT =
  HOTEL_RESOURCE + "/getHotelListDiscount";
export const FETCH_HOTEL_GOOD_BY_LOCATION = HOTEL_RESOURCE + "/findHotelGood";
