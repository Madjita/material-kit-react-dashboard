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

    //console.log("ssss ",router.isReady, isAuthenticated,userDto,"isAuthorizedStatus = [",isAuthorizedStatus,"]","auth=",auth);

    // Проверка аутентификации может занять некоторое время, поэтому лучше сначала убедиться, что роутер готов.
    if (!router.isReady) {
      return;
    }

    // if(isAuthorizedStatus.status === RequestStatus.INITIAL)
    // {
    //   //если только была инициализация после обновления, то
    //   return;
    // }
    
    console.log("AuthGuard:", isAuthorizedStatus.status, isAuthenticated);
    // Если пользователь не аутентифицирован, перенаправляем на страницу входа.
    if (!isAuthenticated) {

      if(isAuthorizedStatus.status === RequestStatus.REMOVED || isAuthorizedStatus.status === RequestStatus.UserNotFound)
      {
        router.replace({ pathname: '/auth/login' }).catch(console.error);
      }

      //const continueUrl = router.asPath !== '/' ? { continueUrl: router.asPath } : undefined;
      //router.replace({ pathname: '/auth/login', query: continueUrl }).catch(console.error);
      //router.replace({ pathname: '/auth/login' }).catch(console.error);
      /*if(continueUrl == undefined)
      {
        router.replace({ pathname: '/auth/login' }).catch(console.error);
      }
      else
      {
        //router.replace({ pathname: continueUrl.continueUrl }).catch(console.error);
        router.replace({ pathname: '/auth/login', query: continueUrl }).catch(console.error);
      }*/

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
