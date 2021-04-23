import api from '../apiCall';

export const resetPass = async data => {
  return api.post('/resetPassword', data);
};
