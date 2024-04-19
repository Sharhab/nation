import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://promisepay.onrender.com/api';

export const RequestMethod = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

/**
 * @description Function to make network requests to the API.
 *
 * @param {string} method - HTTP method (GET, POST, PUT, PATCH, DELETE).
 * @param {string} path - API endpoint path.
 * @param {Object} [requestBody] - Request body for POST, PUT, and PATCH requests.
 * @param {Object} [params] - URL parameters for the request.
 * @param {Object} [headers] - Custom headers for the request.
 *
 * @returns {Promise<Object>} - Promise that resolves to the response data.
 */
export const makeNetworkCall = async ({ method, path, requestBody, params, headers }) => {
  if (!method || !path) {
    throw new Error('A required parameter is missing. Please provide method and path.');
  }

  const url = `${BASE_URL}${path}`;

  try {
    const response = await axios({
      method,
      url,
      params,
      headers,
      data: requestBody,
    });

    return response.data;
  } catch (error) {
    // Check if the error has a response object from Axios
    if (error.response) {

console.log(error.response) 
     const errorMessage = error.response.data.message || 'Bad Request';
      throw new Error(errorMessage);
    } else {
      // Handle other types of errors or network issues
      throw new Error(error.message || 'An unexpected network error occurred');
    }
  
  }
};
