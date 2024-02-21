import { combineReducers } from 'redux';
// reducer import
import customizationReducer from './customizationReducer';
import {
    airtimeOrderReducer,
    CgOrderReducer,
    dataGiftingOrderReducer,
    dataOrderReducer,
    electricityPurchase,
    examPinPurchase,
    forgetPasswordReducer,
    forgetPinReducer,
    getAirtelcgDataReducer,
    getAirtelDataReducer,
    getBtcDetailsReducer,
    getelectricityProvidersReducer,
    getGloCgDataReducer,
    getGloDataReducer,
    getHistoriesReducer,
    getMtnDataReducer,
    getMtnSmeDataReducer,
    getSellAirtimeDetailsReducer,
    getVariationsReducer,
    loginUserReducer,
    logoutReducer,
    monnifyFundingReducer,
    registerUserReducer,
    resetPasswordReducer,
    sellAirtimeReducer,
    tvCablesPurchase,
    userReducer,
    userUpdateReducer,
    verifyDetailsReducers,
    verifyMeterReducers,
    getNotificationReducer,
    generateMonnifyAccountReducer,
    userStatReducer,
    userStatByDateReducer,
    getMtnCgDataReducer,
    getMtnSmeTwoDataReducer,
    getMtnCoupDataReducer
} from './netorkCallsReducers';
// import customizationReducer from './customizationReducer'
// import { userTransactionStatByDate } from './actions';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    myMtnDataPlans: getMtnDataReducer,
    myMtnSmeDataPlans: getMtnSmeDataReducer,
    myMtnCgDataPlans: getMtnCgDataReducer,
    myMtnSme2DataPlans: getMtnSmeTwoDataReducer,
    myMtnCoupDataPlans: getMtnCoupDataReducer,
    myGloDataPlans: getGloDataReducer,
    myAirtelDataPlans: getAirtelDataReducer,
    getairtelCgDataPlans: getAirtelcgDataReducer,
    getgloCgDataPlans: getGloCgDataReducer,
    dataOrder: dataOrderReducer,
    dataGiftingOrder: dataGiftingOrderReducer,
    cgDataOrder: CgOrderReducer,
    airtimeOrder: airtimeOrderReducer,
    sellAirtimeOrder: sellAirtimeReducer,
    login: loginUserReducer,
    logout: logoutReducer,
    register: registerUserReducer,
    loggedInUser: userReducer,
    updateUser: userUpdateReducer,
    forgetPassword: forgetPasswordReducer,
    forgetPin: forgetPinReducer,
    resetPassword: resetPasswordReducer,
    fundWithMonnify: monnifyFundingReducer,
    vtuVariations: getVariationsReducer,
    electricityProviders: getelectricityProvidersReducer,
    tvCablesOrder: tvCablesPurchase,
    electricityOrder: electricityPurchase,
    examPinOrder: examPinPurchase,
    transactionHistory: getHistoriesReducer,
    sellAirtimeDetails: getSellAirtimeDetailsReducer,
    sellBtcDetails: getBtcDetailsReducer,
    verifyDetailsData: verifyDetailsReducers,
    verifyMeterData: verifyMeterReducers,
    notificationDetails: getNotificationReducer,
    monnifyAccountGeneration: generateMonnifyAccountReducer,
    userStat: userStatReducer,
    userStatByDate: userStatByDateReducer
});

export default reducer;
