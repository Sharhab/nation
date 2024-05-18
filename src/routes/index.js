import { useRoutes } from 'react-router-dom';
import Authentications from "./Authentications";
// routes
import MainRoutes from './MainRoutes';
import config from '../config';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
    return useRoutes([MainRoutes, Authentications], config.basename);
}
