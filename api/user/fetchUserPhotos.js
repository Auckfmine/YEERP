/* eslint-disable prettier/prettier */
import api from '../apiCall';

export const fetchPhotos = async id => {
  const response = await api.get(`/user/${id}/images`);

  return response.data;
};
