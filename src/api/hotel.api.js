import { API_ENDPOINT } from "../constants";
import * as HOTEL from "../constants/hotel";
import axiosService from "../services/axiosService";

const RESOURCE = "hotel";
const BASE_URL = `${API_ENDPOINT}/${RESOURCE}`;

export const getHotelList = () => {
  return axiosService.get(`${BASE_URL}/${HOTEL.FETCH_GOOD_HOTEL_LIST}`);
};

export const getHotelDetails = (id) => {
  return axiosService.get(`${BASE_URL}/${id}`);
};

export const addToCart = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${HOTEL.ADD_TO_CART}`, data);
};

export const getCart = (sessionId) => {
  return axiosService.get(`${API_ENDPOINT}/${HOTEL.GET_CART}/${sessionId}`);
};

export const deleteItem = (sessionId, hotelId) => {
  return axiosService.delete(
    `${API_ENDPOINT}/${HOTEL.DELETE_ITEM_FROM_CART}/${sessionId}/${hotelId}`
  );
};

export const bookHotel = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${HOTEL.BOOKING_HOTEL}`, data);
};

export const reportHotel = (data) => {
  return axiosService.post(`${API_ENDPOINT}/${HOTEL.REPORT_HOTEL}`, data);
};

export const getReservedDate = (hotelId) => {
  return axiosService.get(
    `${API_ENDPOINT}/${HOTEL.FETCH_RESERVED_DATE}/${hotelId}`
  );
};

export const getBookingHistoryByEmail = (email) => {
  return axiosService.get(
    `${API_ENDPOINT}/${HOTEL.FETCH_BOOKING_HISTORY_EMAIL}/${email}`
  );
};

export const getBookingHistoryByUsername = (username) => {
  return axiosService.get(
    `${API_ENDPOINT}/${HOTEL.FETCH_BOOKING_HISTORY_USERNAME}/${username}`
  );
};

export const getHotelListDiscount = () => {
  return axiosService.get(`${API_ENDPOINT}/${HOTEL.FETCH_HOTEL_LIST_DISCOUNT}`);
};

export const getHotelGoodByLocation = (location) => {
  return axiosService.get(
    `${API_ENDPOINT}/${HOTEL.FETCH_HOTEL_GOOD_BY_LOCATION}/${location}`
  );
};
