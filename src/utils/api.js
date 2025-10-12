import axios from 'axios';

// const API_BASE_URL = 'http://localhost:5000/api';
const API_BASE_URL = 'https://api-inventory.isavralabel.com/imtc/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API endpoints
export const apiEndpoints = {
  // Auth
  login: '/auth/login',
  
  // Training
  trainings: '/trainings',
  trainingById: (id) => `/trainings/${id}`,
  
  // Gallery
  gallery: '/gallery',
  galleryById: (id) => `/gallery/${id}`,
  
  // Settings
  settings: '/settings',
  
  // Upload
  upload: '/upload',
};

// API functions
export const authAPI = {
  login: (credentials) => api.post(apiEndpoints.login, credentials),
};

export const trainingAPI = {
  getAll: (page = 1, limit = 10) => api.get(`${apiEndpoints.trainings}?page=${page}&limit=${limit}`),
  getById: (id) => api.get(apiEndpoints.trainingById(id)),
  create: (data) => api.post(apiEndpoints.trainings, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(apiEndpoints.trainingById(id), data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(apiEndpoints.trainingById(id)),
};

export const galleryAPI = {
  getAll: (page = 1, limit = 10) => api.get(`${apiEndpoints.gallery}?page=${page}&limit=${limit}`),
  getById: (id) => api.get(apiEndpoints.galleryById(id)),
  create: (data) => api.post(apiEndpoints.gallery, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  update: (id, data) => api.put(apiEndpoints.galleryById(id), data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  delete: (id) => api.delete(apiEndpoints.galleryById(id)),
};

export const settingsAPI = {
  get: () => api.get(apiEndpoints.settings),
  update: (data) => api.put(apiEndpoints.settings, data),
};

export const uploadAPI = {
  uploadFile: (formData) => {
    return api.post(apiEndpoints.upload, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;