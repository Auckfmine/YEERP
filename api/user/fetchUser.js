/* eslint-disable prettier/prettier */
import api from '../apiCall';

export const fetchUser = async id => {
  const response = await api.get(`/user/${id}`);

  return response.data;
};
