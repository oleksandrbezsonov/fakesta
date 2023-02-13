import axios from "axios";
import { getError } from "../utils";
import authHeader from "./authHeader";

const API_ENDPOINT = 'http://localhost:3000';

export const makeRequest = (config) => {
    config.url = `${API_ENDPOINT}${config.url}`; 
    config.headers = authHeader();
    console.log(config.headers);
    return axios(config).catch(err => getError(err));
};
