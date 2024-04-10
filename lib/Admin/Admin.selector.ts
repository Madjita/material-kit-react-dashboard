import { ReduxState } from '../redux/store';

export const selectAdminDto = (state: ReduxState) => state.admin.adminData;
export const selectAdminRequsetStatus = (state: ReduxState) => state.admin.requestStatus;
