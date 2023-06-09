import axios from "axios";
import { BACKEND_API_URL } from "../constants";
import { Destination } from "../models/Destination";

export const addPublicDestination = (destination: Destination) => {
    return axios.post(
      `${BACKEND_API_URL}/destinations/add/`,
      {...destination, belonging_user: "publicUser"},
      {
        withCredentials: true,
      }
    );
  };

export const addPrivateDestination = (destination: Destination) => {
  return axios.post(
    `${BACKEND_API_URL}/destinations/add/`,
    destination,
    {
      withCredentials: true,
    }
  );
};

export const addPublicDestinationToBucket = (id: string | undefined, userName: string) => {
  return axios.get(`${BACKEND_API_URL}/destinations/search?id=${id}`,
  {
    withCredentials: true
  }).
  then((response) => {
    var destinationToAdd : Destination = response.data; 
    destinationToAdd = {...destinationToAdd, belonging_user: userName};
    addPrivateDestination(destinationToAdd);
  });
}

export const updatePrivateDestination = (destination: Destination) => {
  return axios.put(`${BACKEND_API_URL}/destinations/update/`, 
  destination,
  {
    withCredentials: true,
  });
}

export const deletePrivateDestination = (id: string | undefined) => {
  return axios.delete(`${BACKEND_API_URL}/destinations/delete?id=${id}`,
  {
    withCredentials: true
  });
}

export const getSpecificDestination = (id: string | undefined) =>{
  return axios.get(`${BACKEND_API_URL}/destinations/search?id=${id}`,
  {
    withCredentials: true
  });
}

export const getPublicDestinations = () => {
  return axios.get(`${BACKEND_API_URL}/destinations/?list=public`,
  {
    withCredentials: true
  });
};

export const getPrivateDestinations = () => {
  return axios.get(`${BACKEND_API_URL}/destinations/?list=private`, 
  {withCredentials: true});
}

