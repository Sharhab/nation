import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from '../config';

export default function ThemeRoutes() {
  return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
