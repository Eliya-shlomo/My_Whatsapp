import axios from 'axios';

const api = axios.create({
  baseURL:  'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const fetchChats = async () => {
  const response = await api.get('/chats');
  return response.data;
};

export const fetchMessages = async (roomId) => {
  const response = await api.get(`/messages/roomMessages?roomid=${roomId}`);
  return response.data;
};

export const sendMessage = async (message) => {
  const response = await api.post('/messages/send', message);
  return response.data;
};

export const createRoom = async (roomData) => {
  const response = await api.post('/rooms/group', roomData);
  return response.data;
};

export const createPrivateRoom = async (roomData) => {
  const response = await api.post('/rooms/private', roomData);
  return response.data;
};

export const addUserToGroup = async (roomId, userId) => {
  const response = await api.post(`/rooms/group/${roomId}/add`, { userId });
  return response.data;
};

export const getUser = async (username) => {
  const response = await api.get(`/users/${username}`);
  return response.data;
};

export { setAuthToken };
