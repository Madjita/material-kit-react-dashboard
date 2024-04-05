import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {ReduxThunkAction} from '../redux/store'

import {AdminActions, RequestStatus} from './AdminReducer'

export const FETCH_ADMIN_DATA_REQUEST = 'FETCH_ADMIN_DATA_REQUEST';
export const FETCH_ADMIN_DATA_SUCCESS = 'FETCH_ADMIN_DATA_SUCCESS';
export const FETCH_ADMIN_DATA_FAILURE = 'FETCH_ADMIN_DATA_FAILURE';

export const fetchAdminDataRequest = () => ({
  type: FETCH_ADMIN_DATA_REQUEST,
});

export const fetchAdminDataSuccess = (data: any) => ({
  type: FETCH_ADMIN_DATA_SUCCESS,
  payload: data,
});

export const fetchAdminDataFailure = (error: string) => ({
  type: FETCH_ADMIN_DATA_FAILURE,
  payload: error,
});

export const fetchAdminData =():ReduxThunkAction => async (dispatch, getState) => {

    const url = `https://${window.location.hostname}:5000/Admin`;
    try {
      const response: AxiosResponse<any> = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true , // Разрешить отправку и сохранение куков
      });
      dispatch(AdminActions.setAdminData(response.data));
    } catch (error) {
      dispatch(fetchAdminDataFailure(error.message));
    }
};
