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
export const ADD_CONTENT_TYPE = {
  url: `${BACKEND_URL}/contents`,
  method: 'POST',
};
export const DELETE_FIELDBY_ID = (id, fieldName) => ({
  url: `${BACKEND_URL}/contents/${id}/fields/${fieldName}`,
  method: 'DELETE',
});
export const UPDATE_FIELD_BY_ID = (id, fieldName) => ({
  url: `${BACKEND_URL}/contents/${id}/fields/${fieldName}`,
  method: 'PATCH',
});
export const ADD_FIELD_BY_ID = (id) => ({
  url: `${BACKEND_URL}/contents/${id}/fields`,
  method: 'PATCH',
});
