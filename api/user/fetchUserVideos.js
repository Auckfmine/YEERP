/* eslint-disable prettier/prettier */
import api from '../apiCall';

export const fechVideos = async id => {
  const response = await api.get(`/user/videos/${id}`);

  return response.data;
};
