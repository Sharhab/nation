import { useRoutes } from 'react-router-dom';
import AuthenticationRoutes from "./AuthenticationRoutes";
// routes
import MainRoutes from './MainRoutes';
import config from '../config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, AuthenticationRoutes], config.basename);
}
