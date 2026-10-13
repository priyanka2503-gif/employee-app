import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/employees';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const employeeService = {
  getAll: async (search = '') => {
    const params = search && search.trim() ? { search: search.trim() } : {};
    const response = await apiClient.get('', { params });
    return response.data;
  },
  getById: async (id) => {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },
  create: async (employee) => {
    const response = await apiClient.post('', employee);
    return response.data;
  },
  update: async (id, employee) => {
    const response = await apiClient.put(`/${id}`, employee);
    return response.data;
  },
  delete: async (id) => {
    const response = await apiClient.delete(`/${id}`);
    return response.data;
  },
};

export default employeeService;