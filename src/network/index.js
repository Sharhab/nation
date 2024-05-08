import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://globstand-backend.onrender.com/api';

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
    console.error('Network Request Error:', error);

    // Additional debugging: log the error response to understand the structure
    if (error.response) {
      console.log("Error response data:", error.response.data);

      // Attempt to extract the message from known possible paths
      const errorMessage = extractErrorMessage(error.response.data);
      throw new Error(errorMessage);
    } else {
      // This is for network issues or errors not directly tied to HTTP responses
      throw new Error('An unexpected network error occurred');
    }
  }
};

/**
 * Tries to find an error message in various parts of the response data object.
 * @param {Object} responseData - The data payload from an error response.
 * @return {string} The found error message or a default error message if none is found.
 */
function extractErrorMessage(responseData) {
  // Check common error message paths
  if (responseData.message) {
    return responseData.message;
  }
  if (responseData.data && responseData.data.message) {
    return responseData.data.message;
  }
  if (responseData.error) {
    if (Array.isArray(responseData.error) && responseData.error.length) {
      return responseData.error.join(', '); // Join error messages if it's an array
    }
    return responseData.error;
  }
  if (responseData.errors) {
    let errors = responseData.errors;
    // If errors is an object, attempt to join all error strings
    if (typeof errors === 'object' && !Array.isArray(errors)) {
      return Object.values(errors).map(error => error.join(', ')).join('; ');
    }
    // If errors is a simple array
    if (Array.isArray(errors)) {
      return errors.join(', ');
    }
  }

  return 'Bad Request'; // Default message if no error specifics are found
}
