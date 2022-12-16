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
