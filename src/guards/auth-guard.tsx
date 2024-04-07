import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from '../../lib/redux';
import { selectUserIsAuthorized, selectUserRequsetStatus } from '../../lib/User/User.selector';
import {useAuth2} from '../hooks/use-auth'
import Spinner from '../components/Spinner/Spinner';
import { RequestStatus } from '../../lib/User/User.store';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const auth = useAuth2();
  const isAuthenticated = useSelector(selectUserIsAuthorized)
  const isAuthorizedStatus = useSelector(selectUserRequsetStatus)
  const userDto = useSelector(state => state.user.userDto)

  const [checked, setChecked] = useState(false);

  useEffect(() => {

    // Проверка аутентификации может занять некоторое время, поэтому лучше сначала убедиться, что роутер готов.
    if (!router.isReady) {
      return;
    }
    console.log("AuthGuard:", isAuthorizedStatus.status, isAuthenticated);
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа.
    if (!isAuthenticated) {

      if(isAuthorizedStatus.status === RequestStatus.REMOVED || isAuthorizedStatus.status === RequestStatus.UserNotFound)
      {
        router.replace({ pathname: '/auth/login' }).catch(console.error);
      }

    } else {
      setChecked(true);
    }
  }, [router.isReady, isAuthenticated,isAuthorizedStatus]);

  // Если мы еще не проверили аутентификацию, просто ничего не рендерим.
  if (!checked) {
    return  <Spinner />;
  }

  // Если аутентификация прошла успешно, рендерим дочерние элементы.
  return <>{children}</>;
};

export default AuthGuard;
