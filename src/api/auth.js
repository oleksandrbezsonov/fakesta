import { makeRequest, makeLoginRequest } from "./makeRequest";

const URL_LOG = '/login';
const URL_REG = '/register';

export const login = (config) => makeRequest({
    method: 'POST',
    url: URL_LOG,
    ...config,
});

export const register = (config) => makeRequest({
    method: 'POST',
    url: URL_REG,
    ...config,
});