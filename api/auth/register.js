import api from '../apiCall';

export const registerUser = async data => {
  return api.post('/signup/', data);
};
