import React from 'react';
import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from '../layout/MainLayout';
import ProtectedRoute from './ProtectedRout';
import Loadable from '../ui-component/Loadable'; 
import config from '../config'; 
import AuthenticationRoutes from './AuthenticationRoutes';
import { lazy } from 'react';

// Lazy imports for components
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const ResetPswdWrapper = Loadable(lazy(() => import('../views/pages/authentication/authentication3/ResetPswd')));
const PinReset = Loadable(lazy(() => import('../views/pin_reset/pin_reset_page')));
const PinResetEmail = Loadable(lazy(() => import('../views/pin_reset/pin_reset_email')));
const Login = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Login3')));
const Register = Loadable(lazy(() => import('../views/pages/authentication/authentication3/Register3')));
const ForgetPswdWrapper = Loadable(lazy(() => import('../views/pages/authentication/authentication3/ForgetPswd')));
const UtilsTypography = Loadable(lazy(() => import('../views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('../views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('../views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('../views/utilities/TablerIcons')));
const SelectAirtimeView = Loadable(lazy(() => import('../views/airtime/airtimeSelectionView')));
const SellAirtimeOtp = Loadable(lazy(() => import('../views/sell-airtime/sell-airtime-otp')));
const FinalizeSellAirtime = Loadable(lazy(() => import('../views/sell-airtime/finalize-sell-airtime')));
const SelectDataView = Loadable(lazy(() => import('../views/data/dataSelectionView')));
const BuyAirtime = Loadable(lazy(() => import('../views/airtime')));
const BuyData = Loadable(lazy(() => import('../views/data')));
const SubTv = Loadable(lazy(() => import('../views/cables&tv')));
const Electricity = Loadable(lazy(() => import('../views/electricity')));
const ExamPin = Loadable(lazy(() => import('../views/exam')));
const Funding = Loadable(lazy(() => import('../views/payments/Funding')));
const SuccessPayment = Loadable(lazy(() => import('../views/payments/ConfirmPayment')));
const Profile = Loadable(lazy(() => import('../views/profile')));
const EditProfile = Loadable(lazy(() => import('../views/profile/edit_profile')));
const Histories = Loadable(lazy(() => import('../views/histories/Transaction_History')));
const Contact = Loadable(lazy(() => import('../views/contact-us/Contact')));

const MainRoutes = () => {
  const isLoggedIn = useSelector(state => state.userStat.isLoggedIn);

  const routesConfig = [
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <ProtectedRoute isLoggedIn={isLoggedIn}><DashboardDefault /></ProtectedRoute>
        },
        { path: '/reset-pwd', element: <ResetPswdWrapper /> },
        { path: '/reset-pin', element: <PinReset /> },
        { path: '/forget-pin', element: <PinResetEmail /> },
        { path: '/pages/login', element: <Login /> },
        { path: '/pages/register', element: <Register /> },
        { path: '/pages/auth/forget-pswd', element: <ForgetPswdWrapper /> },
        { path: '/utils/util-typography', element: <UtilsTypography /> },
        { path: '/utils/util-color', element: <UtilsColor /> },
        { path: '/utils/util-shadow', element: <UtilsShadow /> },
        { path: '/icons/material-icons', element: <UtilsMaterialIcons /> },
        { path: '/icons/tabler-icons', element: <UtilsTablerIcons /> },
        { path: '/buy-airtime', element: <SelectAirtimeView /> },
        { path: '/sell-airtime-otp', element: <SellAirtimeOtp /> },
        { path: '/finalize-sell-airtime', element: <FinalizeSellAirtime /> },
        { path: '/buy-data', element: <SelectDataView /> },
        { path: '/cable-tv-sub', element: <SubTv /> },
        { path: '/electricity-sub', element: <Electricity /> },
        { path: '/exam-pin', element: <ExamPin /> },
        { path: '/fund-wallet', element: <Funding /> },
        { path: '/confirm-payment', element: <SuccessPayment /> },
        { path: '/profile', element: <Profile /> },
        { path: '/edit-profile', element: <EditProfile /> },
        { path: '/trx-histories', element: <Histories /> },
        { path: '/contact-us', element: <Contact /> },
        // Continue adding other routes as needed
      ]
    }
  ];

  return useRoutes([routesConfig, AuthenticationRoutes], config.basename);
};

export default MainRoutes;
