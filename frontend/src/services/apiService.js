import axios from "axios";
import { baseURL} from '../constant/index'


export const getAPI = async (url, body) => {
  const response = await axios.get(`${baseURL}/${url}`, body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
  });
  return response;
};



export const postAPI = async (url, params) => {
  const response = await axios.post(`${baseURL}/${url}`, params, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
  });
  return response;
 
};