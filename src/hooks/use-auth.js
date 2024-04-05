import { useContext } from 'react';
import { AuthReduxContext } from '../contexts/AuthReduxContext';

export const useAuth2 = () => useContext(AuthReduxContext)