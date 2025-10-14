import toast from "react-hot-toast";

/**
 * Make a POST request to create a new resource
 * @param {Function} reset - Form reset function
 * @param {Function} setLoading - Loading state setter
 * @param {string} endpoint - API endpoint
 * @param {string} message - Resource name for toast messages
 * @param {Object} data - Data to send
 * @returns {Promise<Object>} Response data
 */
export const makePostRequest = async (reset, setLoading, endpoint, message, data) => {
  try {
    setLoading(true);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Parse response
    let result;
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { error: text };
    }

    if (response.ok) {
      toast.success(`Successfully Added the ${message}`);
      reset();
      return result; // ✅ Return result for caller to use
    } else {
      // Handle error response
      const errorMessage = result.error || result.message || 'An error occurred';
      console.error('POST Error:', errorMessage);
      toast.error(`Error: ${errorMessage}`);
      throw new Error(errorMessage); // ✅ Throw error for caller to catch
    }
  } catch (error) {
    console.error('POST Request Error:', error);
    toast.error(`Error: ${error.message}`);
    throw error; // ✅ Re-throw for caller
  } finally {
    setLoading(false);
  }
};

/**
 * Make a GET request to fetch data
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
export const getRequest = async (endpoint) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const url = `${baseUrl}/api/${endpoint}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        'Pragma': 'no-cache',
      },
      cache: 'no-store', // Next.js specific
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Handle both array and object responses
    if (data.success === false) {
      throw new Error(data.error || 'Request failed');
    }
    
    // Return data in consistent format
    return Array.isArray(data) ? data : data.data || data;
  } catch (error) {
    console.error(`GET Request Error (${endpoint}):`, error);
    throw error; // ✅ Throw error for caller to handle
  }
};

/**
 * Make a PUT request to update a resource
 * @param {Function} reset - Form reset function (optional)
 * @param {Function} setLoading - Loading state setter
 * @param {string} endpoint - API endpoint
 * @param {string} message - Resource name for toast messages
 * @param {Object} data - Data to send
 * @returns {Promise<Object>} Response data
 */
export const updateRequest = async (reset, setLoading, endpoint, message, data) => {
  try {
    setLoading(true);
    
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    // Parse response
    let result;
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { error: text };
    }

    if (response.ok) {
      toast.success(`Successfully Updated the ${message}`);
      if (reset) reset(); // ✅ Optional reset for update scenarios
      return result;
    } else {
      const errorMessage = result.error || result.message || 'An error occurred';
      console.error('PUT Error:', errorMessage);
      toast.error(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('PUT Request Error:', error);
    toast.error(`Error: ${error.message}`);
    throw error;
  } finally {
    setLoading(false);
  }
};

/**
 * Make a DELETE request to remove a resource
 * @param {string} endpoint - API endpoint
 * @param {string} message - Resource name for toast messages
 * @returns {Promise<Object>} Response data
 */
export const deleteRequest = async (endpoint, message) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
    const response = await fetch(`${baseUrl}/api/${endpoint}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });

    // Parse response
    let result;
    const contentType = response.headers.get("content-type");
    
    if (contentType && contentType.includes("application/json")) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { error: text };
    }

    if (response.ok) {
      toast.success(`Successfully Deleted the ${message}`);
      return result;
    } else {
      const errorMessage = result.error || result.message || 'An error occurred';
      console.error('DELETE Error:', errorMessage);
      toast.error(`Error: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error('DELETE Request Error:', error);
    toast.error(`Error: ${error.message}`);
    throw error;
  }
};

/**
 * Helper function to handle fetch errors uniformly
 * @param {Response} response - Fetch response object
 * @returns {Promise<Object>} Parsed response data
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    const text = await response.text();
    return { error: text, message: text };
  }
};
