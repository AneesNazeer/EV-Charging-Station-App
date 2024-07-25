import axios from "axios";
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;
const CLERK_API_KEY = process.env.CLERK_API_KEY;
const FIREBASE_API = process.env.FIREBASE_API;
const SEARCH_API_KEY = process.env.SEARCH_API_KEY;
const config = {
  headers: {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": API_KEY,
    "X-Goog-FieldMask": [
      "places.displayName",
      "places.formattedAddress",
      "places.location",
      "places.evChargeOptions",
      "places.shortFormattedAddress",
      "places.photos",
      "places.id",
    ],
  },
};
const NewNearByPlace = (data) => axios.post(BASE_URL, data, config);
export default {
  NewNearByPlace,
  CLERK_API_KEY,
  API_KEY,
  FIREBASE_API,
  SEARCH_API_KEY,
};
