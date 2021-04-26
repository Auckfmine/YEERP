/* eslint-disable prettier/prettier */
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  invitationAccepted: false,
  invitationDeclined: false,
  invitationSent: false,
};
const invitationsSlice = createSlice({
  name: 'invitation',
  initialState,
  reducers: {
    acceptInvitation: state => {
      state.invitationAccepted = true;
    },
    declineInvitation: state => {
      state.invitationDeclined = true;
    },
    sendInvitation: state => {
      state.invitationSent = true;
    },
  },
});
