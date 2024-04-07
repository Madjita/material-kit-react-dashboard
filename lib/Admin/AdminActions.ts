import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import {ReduxThunkAction} from '../redux/store'

import {AdminActions, RequestStatus} from './AdminReducer'
import { GetApi } from '../../src/api/api';

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
    try {
      const response: AxiosResponse<any> = await GetApi(window.location.hostname).get('/Admin', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true , // Разрешить отправку и сохранение куков
      });
      dispatch(AdminActions.setAdminData(response.data));
    } catch (error) {
      if (error.code == "ERR_NETWORK" || (error.response && error.response.status === 401)) {
        // Обрабатываем ошибку 401 (Unauthorized)
        console.log("AdminData Unauthorized error");
      } else {
        // Обработка других ошибок
        console.error("AdminData Error occurred ",error);
      }
      dispatch(fetchAdminDataFailure(error.message))
    }
};
