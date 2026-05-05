// Generic API client for EasyWorkShop

export const apiClient = {
  // Placeholder for future backend integration
  get: async (url, options = {}) => {
    console.log(`GET request to: ${url}`, options);
    return { data: {} };
  },
  post: async (url, data, options = {}) => {
    console.log(`POST request to: ${url}`, data, options);
    return { data: {} };
  },
  put: async (url, data, options = {}) => {
    console.log(`PUT request to: ${url}`, data, options);
    return { data: {} };
  },
  delete: async (url, options = {}) => {
    console.log(`DELETE request to: ${url}`, options);
    return { data: {} };
  },
};

export default apiClient;
