export const BACKEND_URL = 'http://localhost:5000';
export const AUTH_URL = 'http://localhost:4000';

export const LOGIN = {
  url: `${AUTH_URL}/auth/login`,
  method: 'POST',
};
export const GET_ALL_CONTENT_TYPES = {
  url: `${BACKEND_URL}/contents`,
  method: 'GET',
};
