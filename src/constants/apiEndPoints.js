export const BACKEND_URL = 'http://localhost:5000';
export const AUTH_URL = 'http://localhost:4000';

export const LOGIN = {
  url: `${AUTH_URL}/auth/login`,
  method: 'POST',
};
export const VERIFY_TOKEN = {
  url: `${AUTH_URL}/auth/token/verify`,
  method: 'POST',
};
export const REGISTER = {
  url: `${AUTH_URL}/users`,
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
export const GET_COLLECTIONS_BY_ID = (contentId) => ({
  url: `${BACKEND_URL}/contents/${contentId}/collections`,
  method: 'GET',
});
export const ADD_COLLECTION_BY_ID = (contentId) => ({
  url: `${BACKEND_URL}/contents/${contentId}/collections`,
  method: 'POST',
});
export const DELETE_COLLECTION_BY_ID = (contentId, collectionId) => ({
  url: `${BACKEND_URL}/contents/${contentId}/collections/${collectionId}`,
  method: 'DELETE',
});
export const UPDATE_COLLECTION_BY_ID = (contentId, collectionId) => ({
  url: `${BACKEND_URL}/contents/${contentId}/collections/${collectionId}`,
  method: 'PATCH',
});
export const UPDATE_CONTENT_NAME_BY_ID = (contentId) => ({
  url: `${BACKEND_URL}/contents/${contentId}`,
  method: 'PATCH',
});
