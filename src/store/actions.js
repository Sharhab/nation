import Cookies from 'js-cookie';
import { makeNetworkCall } from '../network';
import {
    BUY_AIRTIME_FAIL,
    BUY_AIRTIME_REQUEST,
    BUY_AIRTIME_SUCCESS,
    BUY_CG_DATA_FAIL,
    BUY_CG_DATA_REQUEST,
    BUY_CG_DATA_SUCCESS,
    BUY_DATA_FAIL,
    BUY_DATA_REQUEST,
    BUY_DATA_SUCCESS,
    BUY_ELECTRICITY_FAIL,
    BUY_ELECTRICITY_REQUEST,
    BUY_ELECTRICITY_SUCCESS,
    BUY_EXAM_PIN_FAIL,
    BUY_EXAM_PIN_REQUEST,
    BUY_EXAM_PIN_SUCCESS,
    BUY_TV_CABLES_FAIL,
    BUY_TV_CABLES_REQUEST,
    BUY_TV_CABLES_SUCCESS,
    FORGET_PASSWORD_FAIL,
    FORGET_PASSWORD_REQUEST,
    FORGET_PASSWORD_SUCCESS,
    FORGET_PIN_FAIL,
    FORGET_PIN_REQUEST,
    FORGET_PIN_SUCCESS,
    FUND_WALLET_BY_MONNIFY_FAIL,
    FUND_WALLET_BY_MONNIFY_REQUEST,
    FUND_WALLET_BY_MONNIFY_SUCCESS,
    GENERATE_mONNIFY_ACCOUNT_FAIL,
    GENERATE_mONNIFY_ACCOUNT_REQUEST,
    GENERATE_mONNIFY_ACCOUNT_SUCCESS,
    GET_AIRTEL_CG_DATA_PLAN_FAIL,
    GET_AIRTEL_CG_DATA_PLAN_REQUEST,
    GET_AIRTEL_CG_DATA_PLAN_SUCCESS,
    GET_AIRTEL_DATA_PLAN_FAIL,
    GET_AIRTEL_DATA_PLAN_REQUEST,
    GET_AIRTEL_DATA_PLAN_SUCCESS,
    GET_BTC_DETAILS_FAIL,
    GET_BTC_DETAILS_REQUEST,
    GET_BTC_DETAILS_SUCCESS,
    GET_ELECTRICITY_PROVIDERS_FAIL,
    GET_ELECTRICITY_PROVIDERS_REQUEST,
    GET_ELECTRICITY_PROVIDERS_SUCCESS,
    GET_GLO_CG_DATA_PLAN_FAIL,
    GET_GLO_CG_DATA_PLAN_REQUEST,
    GET_GLO_CG_DATA_PLAN_SUCCESS,
    GET_GLO_DATA_PLAN_FAIL,
    GET_GLO_DATA_PLAN_REQUEST,
    GET_GLO_DATA_PLAN_SUCCESS,
    GET_LOGGED_IN_USER_FAIL,
    GET_LOGGED_IN_USER_REQUEST,
    GET_LOGGED_IN_USER_SUCCESS,
    GET_MTN_COUPON_DATA_PLAN_FAIL,
    GET_MTN_COUPON_DATA_PLAN_REQUEST,
    GET_MTN_COUPON_DATA_PLAN_SUCCESS,
    GET_MTN_CG_DATA_PLAN_REQUEST,
    GET_MTN_CG_DATA_PLAN_SUCCESS,
    GET_MTN_CG_DATA_PLAN_FAIL,
    GET_MTN_DATA_PLAN_FAIL,
    GET_MTN_DATA_PLAN_REQUEST,
    GET_MTN_DATA_PLAN_SUCCESS,
    GET_MTN_SME_2_DATA_PLAN_FAIL,
    GET_MTN_SME_2_DATA_PLAN_REQUEST,
    GET_MTN_SME_2_DATA_PLAN_SUCCESS,
    GET_MTN_SME_DATA_PLAN_FAIL,
    GET_MTN_SME_DATA_PLAN_REQUEST,
    GET_MTN_SME_DATA_PLAN_SUCCESS,
    GET_NOTIFICATION_FAIL,
    GET_NOTIFICATION_REQUEST,
    GET_NOTIFICATION_SUCCESS,
    GET_SELL_AIRTIME_DETAILS_FAIL,
    GET_SELL_AIRTIME_DETAILS_REQUEST,
    GET_SELL_AIRTIME_DETAILS_SUCCESS,
    GET_TRANSACTION_HISTORY_FAIL,
    GET_TRANSACTION_HISTORY_REQUEST,
    GET_TRANSACTION_HISTORY_SUCCESS,
    GET_USER_STAT_BY_DATE_FAIL,
    GET_USER_STAT_BY_DATE_REQUEST,
    GET_USER_STAT_BY_DATE_SUCCESS,
    GET_USER_STAT_FAIL,
    GET_USER_STAT_REQUEST,
    GET_USER_STAT_SUCCESS,
    GET_VARIANTS_FAIL,
    GET_VARIANTS_REQUEST,
    GET_VARIANTS_SUCCESS,
    GIFT_DATA_FAIL,
    GIFT_DATA_REQUEST,
    GIFT_DATA_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    SELL_AIRTIME_FAIL,
    SELL_AIRTIME_REQUEST,
    SELL_AIRTIME_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    VERIFY_DETAILS_FAIL,
    VERIFY_DETAILS_REQUEST,
    VERIFY_DETAILS_SUCCESS,
    VERIFY_METER_FAIL,
    VERIFY_METER_REQUEST,
    VERIFY_METER_SUCCESS
} from './constant';

// action - customization reducer
export const SET_MENU = '@customization/SET_MENU';
export const MENU_TOGGLE = '@customization/MENU_TOGGLE';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const SET_FONT_FAMILY = '@customization/SET_FONT_FAMILY';
export const SET_BORDER_RADIUS = '@customization/SET_BORDER_RADIUS';

 const token = Cookies.get('token');
// const id = Cookies.get('user_id')
export const getGloData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_GLO_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('glodata', data);
        dispatch({
            type: GET_GLO_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_GLO_DATA_PLAN_FAIL,
            payload: error.response?.data?.error?.message || error?.messag
        });
    }
};

export const getMtnSmeData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MTN_SME_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/mtn-sme-plan-models',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('mtnsemdata', data);
        dispatch({
            type: GET_MTN_SME_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_MTN_SME_DATA_PLAN_FAIL,
            payload: error.response?.data?.error?.message || error?.messag
        });
    }
};

export const getMtnSmeTwoData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MTN_SME_2_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/mtn-sme-2-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_MTN_SME_2_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_MTN_SME_2_DATA_PLAN_FAIL,
            payload:error?.message
        });
    }
};

// export const getMtnSmeOneData = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: GET_MTN_SME_2_DATA_PLAN_REQUEST
//         });
//         const { data } = await makeNetworkCall({
//             method: 'GET',
//             path: '/mtn-sme-1-data-plans',
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         dispatch({
//             type: GET_MTN_SME_2_DATA_PLAN_SUCCESS,
//             payload: data
//         });
//     } catch (error) {
//         dispatch({
//             type: GET_MTN_SME_2_DATA_PLAN_FAIL,
//             payload: error?.messag
//         });
//     }
// };
export const getMtnCgData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MTN_CG_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/mtn-corporate-gifting',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({
            type: GET_MTN_CG_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_MTN_CG_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};
export const getMtnSmeCoupData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MTN_COUPON_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/mtn-coupon-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_MTN_COUPON_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_MTN_COUPON_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};
export const getMtnData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_MTN_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/mtn-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_MTN_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_MTN_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};

export const getAirtelData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_AIRTEL_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/airtel-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_AIRTEL_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_AIRTEL_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};

export const getGloCgData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_GLO_CG_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/glo-cg-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_GLO_CG_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_GLO_CG_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};

export const getAirtelCgData = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_AIRTEL_CG_DATA_PLAN_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: '/airtel-cg-data-plans',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_AIRTEL_CG_DATA_PLAN_SUCCESS,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: GET_AIRTEL_CG_DATA_PLAN_FAIL,
            payload: error?.message
        });
    }
};

export const buyAirtime =
    ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_AIRTIME_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: '/airtime-orders',
                requestBody: orderDetails,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            data&&
            dispatch({
                type: BUY_AIRTIME_SUCCESS,
                payload: data.message
            });

            // data &&
            //     enqueueSnackbar(data?.data?.message, {
            //         variant: 'success'
            //     });
            setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: BUY_AIRTIME_FAIL,
                payload:error?.message
            });
            error &&
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            setErrorAlert((prevState) => !prevState);
        }
    };

export const sellAirtime = ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert, navigate, from }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: SELL_AIRTIME_REQUEST
            });

            const { data } = await makeNetworkCall({
                method: 'POST',
                path: from === 'verify-airtime-otp' ? 'verify-airtime-otp' : from === 'get-otp' ? 'sell-airtime' : 'finalize-sell-airtime',
                requestBody: {
                    data: orderDetails
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // if (data) {
            // console.log(data);
            // file.append('ref', 'api::sell-airtime.sell-airtime');
            // file.append('refId', data.data.Order.id);
            // file.append('field', 'screenshot');
            // const res = await makeNetworkCall({
            //     method: 'POST',
            //     path: 'upload',
            //     requestBody: file,
            //     headers: {
            //         Authorization: `Bearer ${token}`
            //     }
            // });

            // console.log('====================================');
            // console.log(res.data);
            // console.log('====================================');

            // if (res.data) {
            dispatch({
                type: SELL_AIRTIME_SUCCESS,
                payload: data
            });
            console.log(data);
            enqueueSnackbar(data?.message, {
                variant: 'success',
                autoHideDuration: 2000
            });
            setshowAlert((prevState) => !prevState);
            if (from === 'get-otp') {
                navigate(`/sell-airtime-otp?phone_number=${orderDetails.phone_number}&network=${orderDetails.network}`);
            } else if (from === 'verify-airtime-otp') {
                navigate(
                    `/finalize-sell-airtime?phone_number=${orderDetails.phone_number}&network=${orderDetails.network}&session_id=${data?.data?.sessionId}`
                );
            }

            // }
            // }
        } catch (error) {
            dispatch({
                type: SELL_AIRTIME_FAIL,
                payload: error?.message
            });
            error &&
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            setErrorAlert((prevState) => !prevState);
        }
    };
export const buyData = ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert, path }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_DATA_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path,
                requestBody: orderDetails,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (data) {
           
                // Remove the if statement checking for status === 200
    dispatch({
        type: BUY_CG_DATA_SUCCESS,
        payload: data.message
      });
      
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000
      });
      
      setshowAlert((prevState) => !prevState);
      
              } else if(data&&data.status===400 && data.error){
                dispatch({
                  type: BUY_CG_DATA_FAIL,
                  payload: 'request faild'
                });
          
                enqueueSnackbar('low wallet balance', {
                  variant: 'error',
                  autoHideDuration: 2000
                });
          
                setErrorAlert((prevState) => !prevState);
              }        
        } catch (error) {

            console.log(error)
            dispatch({
                type: BUY_CG_DATA_FAIL,
                payload: error?.message
              });
            
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            setErrorAlert((prevState) => !prevState);
        }
    };

export const buyCouponData =
    ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_DATA_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: '/mtn-coupon-data-orders',
                requestBody: orderDetails,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: BUY_DATA_SUCCESS,
                payload: data
            });
            data &&
                enqueueSnackbar(data?.data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
            setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: BUY_DATA_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            error &&
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            setErrorAlert((prevState) => !prevState);
        }
    };

    export const buyCgData = ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert }) => async (dispatch) => {
        try {
          dispatch({
            type: BUY_CG_DATA_REQUEST
          });
      
          const { data } = await makeNetworkCall({
            method: 'POST',
            path: '/cg-data-orders',
            requestBody: orderDetails,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      
          if (data) {
           
            // Remove the if statement checking for status === 200
dispatch({
    type: BUY_CG_DATA_SUCCESS,
    payload: data.message
  });
  
  enqueueSnackbar(data.message, {
    variant: 'success',
    autoHideDuration: 2000
  });
  
  setshowAlert((prevState) => !prevState);
  
          } else if(data&&data.status===400 && data.error){
            dispatch({
              type: BUY_CG_DATA_FAIL,
              payload: 'request faild'
            });
      
            enqueueSnackbar('low wallet balance', {
              variant: 'error',
              autoHideDuration: 2000
            });
      
            setErrorAlert((prevState) => !prevState);
          }
        } catch (error) {      
            dispatch({
              type: BUY_CG_DATA_FAIL,
              payload: error.message
            });
          
            enqueueSnackbar(error.message, {
              variant: 'error',
              autoHideDuration: 2000
            });
          
            setErrorAlert((prevState) => !prevState);
        }          
      };

export const giftData =
    ({ orderDetails, enqueueSnackbar, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GIFT_DATA_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: '/data-gifting-orders',
                requestBody: orderDetails,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: GIFT_DATA_SUCCESS,
                payload: data
            });
            data &&
                enqueueSnackbar(data?.data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
            setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: GIFT_DATA_FAIL,
                payload: error?.message
            });
            error &&
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            setErrorAlert((prevState) => !prevState);
        }
    };

export const LogoutAction = () => async (dispatch) => {
    try {
        dispatch({
            type: LOGOUT_USER_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'POST',
            path: '/logout',
            requestBody: {},
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        dispatch({
            type: LOGOUT_USER_SUCCESS,
            payload: data?.message || 'logout succefully'
        });

    window.location.replace("/pages/login")
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: "failed to logout"
        });
    }
};
export const LoginAction = ({ user, navigate, enqueueSnackbar }) => async (dispatch) => {
    try {
        // Dispatch action to indicate the start of the login request
        dispatch({
            type: LOGIN_USER_REQUEST
        });

        // Make the network call to perform the login
        const { data } = await makeNetworkCall({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            requestBody: JSON.stringify(user),
            path: '/login',
        });

        // Check if the login was successful
        if (data && data.message) {
            // Dispatch success action and show success snackbar
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: data
            });

            enqueueSnackbar(data.message, {
                variant: 'success',
                autoHideDuration: 2000
            });

            // Navigate to the dashboard on successful login
            navigate('/');
        } else {
            // If no data or message received, handle as an error
            dispatch({
                type: LOGIN_USER_FAIL,
                payload: 'Unexpected response structure'
            });
        }
    } catch (error) {
        // Dispatch failure action and show error snackbar
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error?.message
        });

        enqueueSnackbar(error?.message,  {
            variant: 'error',
            autoHideDuration: 2000
        });

        // You might want to handle additional error handling or logging here
        console.error('Login failed:', error);
    }
};


export const ForgetPinAction = ({ email, enqueueSnackbar }) => async (dispatch) => {
        try {
            dispatch({
                type: FORGET_PIN_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                requestBody: email,
                path: '/forgotPin',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: FORGET_PIN_SUCCESS,
                payload: data
            });

            console.log(data);
            data &&
                enqueueSnackbar(data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
        } catch (error) {
            console.log(error);
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            dispatch({
                type: FORGET_PIN_FAIL,
                payload: error.response?.data?.error?.message || error?.message
            });
        }
    };

export const ForgetPasswordAction =
    ({ email, enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: FORGET_PASSWORD_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                requestBody: email,
                path: '/forgotPassword'
            });
            dispatch({
                type: FORGET_PASSWORD_SUCCESS,
                payload: data
            });

            console.log(data);
            data &&
                enqueueSnackbar(data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
        } catch (error) {
            console.log(error);
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            dispatch({
                type: FORGET_PASSWORD_FAIL,
                payload: error.response?.data?.error?.message || error?.message
            });
        }
    };

export const ResetPasswordAction =
    ({ email, enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: RESET_PASSWORD_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                requestBody: email,
                path: '/resetPassword/resetToken'
            });
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
                payload: data
            });

            console.log(data);
            data &&
                enqueueSnackbar(data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
        } catch (error) {

          
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: error.response?.data?.error?.message || error?.message
            });
        }
    };

    export const registerAction = ({ user, navigate, enqueueSnackbar }) => async (dispatch) => {
        try {
          dispatch({
            type: REGISTER_USER_REQUEST
          });
      
          const { data } = await makeNetworkCall({
            method: 'POST',
            requestBody: user,
            path: '/register',
            headers: {
                    Authorization: `Bearer ${token}`
                }
            });  
              
         if (data && data.message) {
            // Dispatch success action and show success snackbar
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload: data
            });
      enqueueSnackbar(data.message, {
                variant: 'success',
                autoHideDuration: 2000
            });

            // Navigate to the dashboard on successful login
            navigate('/pages/login');
        } else {
          dispatch({
                type: REGISTER_USER_FAIL,
                payload: 'Unexpected response structure'
            });
        }
        } catch (error) {
          console.log(error.response);
          dispatch({
            type: REGISTER_USER_FAIL,
            payload:error?.message
          });

          const errorMessage = error?.message  || 'Registration failed';
          enqueueSnackbar(errorMessage, {
            variant: 'error',
            autoHideDuration: 2000
          });
        }
      };
      
export const UpdateUserAction =
    ({ enqueueSnackbar, user }) =>
    async (dispatch) => {
        const id = Cookies.get('user_id');

        try {
            dispatch({
                type: UPDATE_USER_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'PUT',
                path: `/updateUser/${id}`,
                requestBody: user,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: UPDATE_USER_SUCCESS,
                payload: data
            });
            data &&
                enqueueSnackbar(data?.data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
        } catch (error) {
            dispatch({
                type: UPDATE_USER_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

   

    // GET USER INFO
    export const userAction = ({ navigate}) => async (dispatch) => {
        try {
            dispatch({ type: GET_LOGGED_IN_USER_REQUEST });
    
            const id = Cookies.get('user_id');
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `/users/${id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
             // Adjusted the property access based on the response structu
    
            if (data) {
                dispatch({
                    type: GET_LOGGED_IN_USER_SUCCESS,
                    payload: data.user,
                });
            } else {
                dispatch({
                    type: GET_LOGGED_IN_USER_FAIL,
                    payload: 'Unexpected response structure',
                });
            }
        } catch (error) {
            const errorMessage =  error?.message;
            console.log(errorMessage)
            if (error.response?.data?.error?.status === 401) {
                navigate('/pages/login');
            }
    
            dispatch({
                type: GET_LOGGED_IN_USER_FAIL,
                payload: errorMessage,
            });
        }
    };
        

export const userTransactionStat =
    ({ navigate }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_USER_STAT_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `users-stat`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: GET_USER_STAT_SUCCESS,
                payload: data
            });
            console.log('DATA: ', data);
        } catch (error) {
            if (error.response?.data?.error?.status === 401) {
                navigate('/pages/login');
            }
            dispatch({
                type: GET_USER_STAT_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
        }
    };

export const userTransactionStatByDate =
    ({ navigate, date }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_USER_STAT_BY_DATE_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `users-stat-by-date/${date}`,

                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: GET_USER_STAT_BY_DATE_SUCCESS,
                payload: data
            });
            console.log(data);
        } catch (error) {
            if (error.response?.data?.error?.status === 401) {
                navigate('/pages/login');
            }
            dispatch({
                type: GET_USER_STAT_BY_DATE_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
        }
    };
export const fundWalletWithMonnify = ({ amount, enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: FUND_WALLET_BY_MONNIFY_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: `/account-funding`,
                requestBody: amount,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: FUND_WALLET_BY_MONNIFY_SUCCESS,
                payload: data
            });
            console.log(data);
        } catch (error) {
            console.log('ERROR: ', error);
            dispatch({
                type: FUND_WALLET_BY_MONNIFY_FAIL,
                payload: error?.message
            });
            error &&
                enqueueSnackbar(error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

export const generateMonnifyAccount = ({ enqueueSnackbar, navigate,bvn }) =>
    async (dispatch) => {
        const id = Cookies.get('user_id')
        try {
            dispatch({
                type: GENERATE_mONNIFY_ACCOUNT_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: `/create-reserved-account/${id}`,
                requestBody: bvn,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: GENERATE_mONNIFY_ACCOUNT_SUCCESS,
                payload: data
            });
            console.log(data);
            enqueueSnackbar(data.message, {
                variant: 'sucess',
                autoHideDuration: 2000
            });
            
        } catch (error) {
            console.log('ERROR: ', error);
            dispatch({
                type: GENERATE_mONNIFY_ACCOUNT_FAIL,
                payload:error?.message
            });
            error &&
                enqueueSnackbar( error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

// VTU ACTIONS HERE

// todo: create networkcall to vtpass

export const getVariants =
    ({ provider }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_VARIANTS_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `vtpass-variation/${provider}`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: GET_VARIANTS_SUCCESS,
                payload: data.content.varations
            });
        } catch (error) {
            dispatch({
                type: GET_VARIANTS_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
        }
    };
export const verifyData =
    ({ body, enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            console.log('trying');
            dispatch({
                type: VERIFY_DETAILS_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: `buy-tv-cables/verify/`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                requestBody: body
            });

            dispatch({
                type: VERIFY_DETAILS_SUCCESS,
                payload: data
            });
        } catch (error) {
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.message, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            dispatch({
                type: VERIFY_DETAILS_FAIL,
                payload: error.response?.data?.error?.message || error?.message
            });
        }
    };

export const verifyMeter =
    ({ body, enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            console.log('trying');
            dispatch({
                type: VERIFY_METER_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: `buy-electricity/verify/`,
                headers: {
                    Authorization: `Bearer ${token}`
                },
                requestBody: body
            });

            dispatch({
                type: VERIFY_METER_SUCCESS,
                payload: data
            });
            console.log(data);
        } catch (error) {
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
            dispatch({
                type: VERIFY_METER_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
        }
    };

export const getElectricProviders = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ELECTRICITY_PROVIDERS_REQUEST
        });
        const { data } = await makeNetworkCall({
            method: 'GET',
            path: `electricity-payment-providers`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        dispatch({
            type: GET_ELECTRICITY_PROVIDERS_SUCCESS,
            payload: data.data
        });
        
    } catch (error) {
        dispatch({
            type: GET_ELECTRICITY_PROVIDERS_FAIL,
            payload: error.response?.data?.error?.message || error?.messag
        });
    }
};

export const buyTvCables =
    ({ reqBody, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_TV_CABLES_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: 'buy-tv-cables',
                requestBody: reqBody,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: BUY_TV_CABLES_SUCCESS,
                payload: data
            });
            data && setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: BUY_TV_CABLES_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            setErrorAlert((prevState) => !prevState);
        }
    };

export const buyElectricity =
    ({ reqBody, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_ELECTRICITY_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: 'buy-electricity',
                requestBody: reqBody,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: BUY_ELECTRICITY_SUCCESS,
                payload: data
            });
            data && setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: BUY_ELECTRICITY_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            setErrorAlert((prevState) => !prevState);
        }
    };

export const buyExamPin =
    ({ reqBody, setshowAlert, setErrorAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: BUY_EXAM_PIN_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'POST',
                path: 'buy-exam-pin',
                requestBody: reqBody,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch({
                type: BUY_EXAM_PIN_SUCCESS,
                payload: data
            });
            data && setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: BUY_EXAM_PIN_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            setErrorAlert((prevState) => !prevState);
        }
    };
export const getHistories =
    ({ enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_TRANSACTION_HISTORY_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `transaction-histories`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: GET_TRANSACTION_HISTORY_SUCCESS,
                payload: data?.data
            });
            data &&
                enqueueSnackbar(data?.message, {
                    variant: 'success',
                    autoHideDuration: 2000
                });
    
        } catch (error) {
            console.log(error);
            dispatch({
                type: GET_TRANSACTION_HISTORY_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

export const getSellAirtimeDetails =
    ({ enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_SELL_AIRTIME_DETAILS_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `sell-airtime-models?populate=*`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: GET_SELL_AIRTIME_DETAILS_SUCCESS,
                payload: data.data
            });
        } catch (error) {
            dispatch({
                type: GET_SELL_AIRTIME_DETAILS_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

export const getSellBTCDetails =
    ({ enqueueSnackbar }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_BTC_DETAILS_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `sell-airtime-models`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            dispatch({
                type: GET_BTC_DETAILS_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: GET_BTC_DETAILS_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            error &&
                enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
                    variant: 'error',
                    autoHideDuration: 2000
                });
        }
    };

export const getNotificationDetails =
    ({ enqueueSnackbar, setshowAlert }) =>
    async (dispatch) => {
        try {
            dispatch({
                type: GET_NOTIFICATION_REQUEST
            });
            const { data } = await makeNetworkCall({
                method: 'GET',
                path: `notification`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('notification', data?.data?.attributes);

            dispatch({
                type: GET_NOTIFICATION_SUCCESS,
                payload: data?.data?.attributes
            });
            setshowAlert((prevState) => !prevState);
        } catch (error) {
            dispatch({
                type: GET_NOTIFICATION_FAIL,
                payload: error.response?.data?.error?.message || error?.messag
            });
            // error &&
            //     enqueueSnackbar(error.response?.data?.error?.message || error?.messag, {
            //         variant: 'error',
            //         autoHideDuration: 2000
            //     });
        }
    };