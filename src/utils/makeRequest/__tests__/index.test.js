import axios from 'axios';
import makeRequest from '..';

jest.mock('axios');

describe('makeRequest', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const mockData = { id: 1, name: 'test' };
  it('should make an API call when only apiEndPoint is specified and return response body', async () => {
    axios.mockResolvedValue({
      data: mockData,
    });
    const response = await makeRequest('http://localhost:3000/api/');
    expect(response).toEqual(mockData);
  });

  it('should make an API call when apiEndPoint and dynamicConfig are specified and return response body', async () => {
    axios.mockResolvedValue({
      data: mockData,
    });
    const response = await makeRequest('http://localhost:3000 ', {
      data: {
        id: 1,
      },
    });
    expect(response).toEqual(mockData);
  });

  it('should navigate to error page when API call fails without error code', async () => {
    const navigate = jest.fn();
    axios.mockRejectedValue({
      response: {},
    });
    await makeRequest('http://localhost:3000', {}, navigate);
    expect(navigate).toHaveBeenCalledWith('/error');
  });

  it('should navigate to error page when API call fails with error code', async () => {
    const navigate = jest.fn();
    axios.mockRejectedValue({
      response: {
        status: 500,
      },
    });
    await makeRequest('http://localhost:3000', {}, navigate);
    expect(navigate).toHaveBeenCalledWith('/error/500');
  });
  it('should navigate to login page when API call fails with error code 401', async () => {
    const navigate = jest.fn();
    axios.mockRejectedValue({
      response: {
        status: 401,
      },
    });
    await makeRequest('http://localhost:3000', {}, navigate);
    expect(navigate).toHaveBeenCalledWith('/login');
  });
});
