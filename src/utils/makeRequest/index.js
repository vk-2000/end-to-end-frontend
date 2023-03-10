/* eslint-disable consistent-return */
import axios from 'axios';

const makeRequest = async (apiEndPoint, dynamicConfig, navigate) => {
  try {
    const requestDetails = {
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);
    return data;
  } catch (error) {
    if (!navigate) {
      throw error;
    }
    const errorCode = error.response?.status;
    if (errorCode) {
      if (errorCode === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        // eslint-disable-next-line consistent-return
        return;
      }
      navigate(`/error/${errorCode}`);
    } else {
      navigate('/error');
    }
  }
};

export default makeRequest;
