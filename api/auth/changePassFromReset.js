import api from '../apiCall';

export const changePassword = async ({userId, data}) => {
  return api.post(`/changeResetPassword/${userId}`, data);
};
