import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Admin {
  id: number;
  phone: string;
  telegramChatId: number;
  userName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  messageId: number;
  email: string | null;
  hPassword: string;
  botAdmin: boolean;
  isDeleted: boolean;
}

export enum RequestStatus {
  SUCCESS,
  ERROR,
  LOADING,
  INITIAL
}

export interface AdminState {
  adminData: Admin[];
  requestStatus: RequestStatus;
}

const INITIAL_ADMIN_STATE: AdminState = {
  adminData: [],
  requestStatus: RequestStatus.INITIAL
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState: INITIAL_ADMIN_STATE,
  reducers: {
    setAdminData: (state: AdminState, action: PayloadAction<Admin[]>) => {
      state.adminData = action.payload;
      state.requestStatus = RequestStatus.SUCCESS;
    },
    changeRequestStatus: (state: AdminState, action: PayloadAction<RequestStatus>) => {
      state.requestStatus = action.payload;
    }
  }
});

export const { actions, reducer } = adminSlice;

export const AdminActions = adminSlice.actions

export default adminSlice.reducer;