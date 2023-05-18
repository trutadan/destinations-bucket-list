import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { Destination } from "../models/Destination";

export const addDestination = (destination: Destination) => {
    console.log({...destination, belonging_user: "publicUser"});
    delete destination["id"];
    return axios.post(
      `${BACKEND_API_URL}/destinations/add/`,
      {...destination, belonging_user: "publicUser"},
      {
        withCredentials: true,
      }
    );
  };

export const getPublicDestinations = () => {
  return axios.get(`${BACKEND_API_URL}/destinations/`, {
    withCredentials: true,
  });
};
