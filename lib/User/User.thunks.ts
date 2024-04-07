
import axios, { AxiosResponse } from 'axios';
import {ReduxThunkAction} from '../redux/store'
import {RequestStatus, User, UserActions} from './User.store'
import { getCookieValue } from '../../src/utils/get-cookie';
import { loginEmail } from '../../src/contexts/AuthReqests';
interface UpdateUserArgs {login: string, password: string}

var urlProtocol = "https";

export const CheckCookie =():ReduxThunkAction => async (dispatch, getState) => {
  var user = getState().user;
  console.log("checkCookie dispatch sessionUID", user)
  
  if (user.userDto == null && user.requsetStatus.status != RequestStatus.ERROR) {
    dispatch(GetUserFromSession());
  }
  else
  {
    if(user.requsetStatus.status != RequestStatus.UserNotFound)
      dispatch(UserActions.changeRequestStatus(RequestStatus.UserNotFound));
  } 
  
}

export const GetUserFromSession = ():ReduxThunkAction => async (dispatch, getState) => {
  const url = `${urlProtocol}://${window.location.hostname}:5000/loginTelegram`;

  console.log("GetUserFromSession");

  try {
    const response: AxiosResponse<User> = await axios.get(url, {
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("GetUserFromSession response ",response);

    dispatch(UserActions.setUser(response.data))
    dispatch(UserActions.changeRequestStatus(RequestStatus.SUCCESS))

  } catch (error) {
    if (error.code == "ERR_NETWORK" || (error.response && error.response.status === 401)) {
      // Обрабатываем ошибку 401 (Unauthorized)
      console.log("Unauthorized error: ");
      dispatch(UserActions.changeRequestStatus(RequestStatus.UserNotFound))
    } else {
      // Обработка других ошибок
      console.error("Error occurred: ", error);
      dispatch(UserActions.changeRequestStatus(RequestStatus.ERROR))
    }
  }

}


export const LoginTelegram = ({login}: UpdateUserArgs):ReduxThunkAction => async (dispatch, getState) => {
  const url = `${urlProtocol}://${window.location.hostname}:5000/loginTelegram`;

  console.log("LoginTelegram");

  try {
    const response: AxiosResponse<User> = await axios.post(url, login, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("response ",response);
    // Проверка наличия куки "SessionUID"
    if (document.cookie.includes('SessionUID')) {
      // Куки "SessionUID" присутствует
      console.log('Куки "SessionUID" присутствует.');
    } else {
      // Куки "SessionUID" отсутствует
      console.log('Куки "SessionUID" отсутствует.');
    }
      dispatch(UserActions.setUser(response.data))
  } catch (error) {
    dispatch(UserActions.changeRequestStatus(RequestStatus.ERROR))
  }

}

export const LogOut = ():ReduxThunkAction => async (dispatch, getState) => {
  console.log("LogOut");
  const url = `${urlProtocol}://${window.location.hostname}:5000/logout`;
  try {
    const response: AxiosResponse = await axios.post(url, {}, {
      headers: {
        'Accept': '	*/*',
      },
      withCredentials: true , // Разрешить отправку и сохранение куков
    });
    console.log("response ",response);
    
    dispatch(UserActions.removeUser())
  } catch (error) {
    dispatch(UserActions.changeRequestStatus(RequestStatus.ERROR))
  }
}

export const GetUser = ():ReduxThunkAction => async (dispatch, getState) => {
  return getState().user;
}