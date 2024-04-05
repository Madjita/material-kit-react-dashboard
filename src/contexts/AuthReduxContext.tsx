import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from '../../lib/redux/store';
import { CheckCookie, LoginTelegram, LogOut } from '../../lib/User/User.thunks';
import { selectUserIsAuthorized, selectUserRequsetStatus } from '../../lib/User/User.selector';
import { RequestStatus, RequestStatusValue } from '../../lib/User/User.store';

interface AuthReduxContextProps {
  children: ReactNode;
}

interface AuthReduxContextType {
  isAuthorized: boolean;
  isAuthorizedStatus: RequestStatusValue;
  checkCookie: () => void;
  loginTelegram: (login: string) => void;
  logOut: () => void;
}

export const AuthReduxContext = createContext<AuthReduxContextType | undefined>(undefined);

export function AuthReduxProvider({ children }: AuthReduxContextProps) {
  const dispatch = useDispatch();
  const isAuthorized = useSelector(selectUserIsAuthorized);
  const isAuthorizedStatus = useSelector(selectUserRequsetStatus);

  const checkCookie = () => {
    dispatch(CheckCookie());
  };

  const loginTelegram = (login: string) => {
    dispatch(LoginTelegram({ login: login, password: '' }));
  };

  const logOut = () => {
    dispatch(LogOut());
  };

  useEffect(() => {
    checkCookie();
  }, [isAuthorizedStatus]); // Добавьте зависимость

  const contextValue: AuthReduxContextType = {
    isAuthorized,
    isAuthorizedStatus,
    checkCookie,
    loginTelegram,
    logOut
  };

  return (
    <AuthReduxContext.Provider value={contextValue}>
      {children}
    </AuthReduxContext.Provider>
  );
}

export const useAuthRedux = () => {
  const context = useContext(AuthReduxContext);
  if (!context) {
    throw new Error('useAuthRedux must be used within an AuthReduxProvider');
  }
  return context;
};

export const AuthReduxConsumer = AuthReduxContext.Consumer;
