import { AxiosResponse } from 'axios';
import {ReduxThunkAction} from '../redux/store'

import {AdminActions, RequestStatus} from './AdminReducer'
import { GetApi } from '../../src/api/api';

export const fetchAdminData =():ReduxThunkAction => async (dispatch, getState) => {
    try {
      const response: AxiosResponse<any> = await GetApi(window.location.hostname).get('/api/admin/getTelegramUsers', {
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
      } 
      else if(error.code == "ERR_BAD_REQUEST" && (error.response && error.response.status === 403))
      {
        console.error("AdminData Auntification error",error);
      }
      else {
        // Обработка других ошибок
        console.error("AdminData Error occurred ",error);
      }
      dispatch(AdminActions.changeRequestStatus(RequestStatus.ERROR))
    }
};
