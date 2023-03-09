import axios from 'axios';

// eslint-disable-next-line consistent-return
const makeRequest = async (apiEndPoint, dynamicConfig) => {
  const requestDetails = {
    url: apiEndPoint.url,
    method: apiEndPoint.method,
    ...dynamicConfig,
  };
  const { data } = await axios(requestDetails);
  return data;
};

export default makeRequest;
