import { useContext } from 'react';
import { AuthReduxContext,useAuthRedux } from '../contexts/AuthReduxContext';

export const useAuth2 = () => useAuthRedux(AuthReduxContext)