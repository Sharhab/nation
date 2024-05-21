// material-u
import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect, useRef, useState } from 'react';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';

import {
    buyData,
    giftData,
    getAirtelData,
    getGloData,
    getMtnData,
    getMtnCgData,
    userAction,
    buyCgData,
    getAirtelCgData,
    getGloCgData,
    getMtnSmeTwoData,
    getMtnSmeOneData,
    getMtnSmeCoupData
} from '../../store/actions';
import { CustomButton, CustomSelect, CustomTextField } from '../../ui-component/basic-inputs';
// project imports 
import { useNavigate } from 'react-router';
import MainCard from '../../ui-component/cards/MainCard';
import { generateRequestId } from '../../utils/generateRequestId';
import FeedBack from '../feedBack';
import * as yup from 'yup';

// ==============================|| SAMPLE PAGE ||============================== //

const BuyData = ({ title, network, sme, sme_2, mtn_cg, coup, cg }) => {
    const {
        myGloDataPlans,
        getairtelCgDataPlans,
        getgloCgDataPlans,
        myMtnDataPlans,
        myAirtelDataPlans,
        dataOrder,
        dataGiftingOrder,
        cgDataOrder,
        myMtnSme1DataPlans,
        myMtnCgDataPlans,
        myMtnSme2DataPlans,
        myMtnCoupDataPlans,
        login
    } = useSelector((state) => state);
    const { gloDataPlans } = myGloDataPlans;
    const { mtnDataPlans } = myMtnDataPlans;
    const { mtnSme1Dataplans } = myMtnSme1DataPlans;
    const { mtnCgDataPlans } = myMtnCgDataPlans;
    const { mtnSme2DataPlans } = myMtnSme2DataPlans;
    const { mtnCoupDataPlans } = myMtnCoupDataPlans;
    const { airtelDataPlans } = myAirtelDataPlans;
    const { gloCgDataPlans } = getgloCgDataPlans;
    const { airtelCgDataPlans } = getairtelCgDataPlans;

    const { loading, data, error } = dataOrder;
    const { dataGiftloading, dataGiftData, dataGiftError } = dataGiftingOrder;
    const { Cgdataloading, CgData, CgdataError } = cgDataOrder;
    const { isLoggedIn } = login;

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [showAlert, setshowAlert] = useState(false);
    const [showErrorAlert, setshowErrorAlert] = useState(false);
    const [pin, setPin] = useState("");
    const pinRef = useRef('');
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/pages/login');
        }
        dispatch(userAction({ navigate }));
        dispatch(getGloData());
        dispatch(getMtnData());
        dispatch(getMtnSmeOneData());
        dispatch(getMtnCgData());
        dispatch(getMtnSmeTwoData());
        dispatch(getMtnSmeCoupData());
        dispatch(getAirtelData());
        dispatch(getAirtelCgData());
        dispatch(getGloCgData());
    }, [dispatch, navigate, isLoggedIn]);

    const INITIAL_FORM_VALUES = {
        beneficiaryNum: '',
        amount: '',
        plan: '',
        network: '',
        pin: ''
    };
    const VALIDATIONS = yup.object().shape({
        beneficiaryNum: yup
            .string()
            .matches(/^\d+$/, 'Only numbers are allowed')
            .max(11, 'Maximum 11 characters allowed')
            .min(11, 'number is not complete')
            .required('Please enter beneficiary number'),
        amount: yup.number().integer().required('Please enter airtime amount').typeError('amount must be a number'),
        plan: yup.object().required('Please select data plan'),
        network: yup.string().required('Please select data plan'),
        pin: yub.string().match(/^\d+$/, 'only number')
        .max(4, 'max of 4 characters allowed').min(4, 'min of 4 characters allowed')
    });

    const returnPlan = ({ network, sme, sme_2, mtn_cg, coup, cg }) => {
        switch (network) {
            case 'Glo':
                return cg ? gloCgDataPlans : gloDataPlans;
            case 'Mtn':
                if (sme) return mtnSme1Dataplans;
                if (sme_2) return mtnSme2DataPlans;
                if (mtn_cg) return mtnCgDataPlans;
                if (coup) return mtnCoupDataPlans;
                return mtnDataPlans;
            case 'Airtel':
                return cg ? airtelCgDataPlans : airtelDataPlans;
            default:
                return [];
        }
    };

    const sendCgdata = (values) => {
        if (!pinRef.current.values) {
            enqueueSnackbar('provide transaction pin to proceed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }
        const body = {
            beneficiary: values.beneficiaryNum,
            amount: values.amount,
            network_id: values.plan.network_id,
            plan: values.plan.bundle,
            plan_id: values.plan.plan_id,
            network: network,
            request_Id: generateRequestId(),
            pin: pin
        };

        dispatch(
            buyCgData({
               orderDetails: {
                    data: { ...body }
                },
                enqueueSnackbar,
                setshowAlert,
                setErrorAlert: setshowErrorAlert
            })
        );
    };
    const sendGiftData = (values) => {
        if (!pinRef.current.values) {
            enqueueSnackbar('provide transaction pin to proceed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }
        const body = {
            beneficiary: values.beneficiaryNum,
            amount: values.amount,
            plan: values.plan.bundle,
            plan_id: values.plan.plan_id,
            network: values.network,
            network_id: values.plan.network_id,
            request_id: generateRequestId(),
            pin: pin
        };

        dispatch(
            giftData({
                orderDetails: {
                    data: { ...body }
                },
                enqueueSnackbar,
                setshowAlert,
                setErrorAlert: setshowErrorAlert
            })
        );
    };

    const handleSubmit = (values, { resetForm }) => {
        if (!pinRef.current.values) {
            enqueueSnackbar('Provide transaction pin to proceed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }

        const body = {
            beneficiary: values.beneficiaryNum,
            amount: values.amount,
            network_id: values.plan.network_id,
            plan: values.plan.bundle,
            plan_id: values.plan.plan_id,
            network: network,
            request_Id: generateRequestId(),
            pin: pin
        };

        dispatch(buyData({
            path: sme ? '/mtn-sme-data-orders' : sme_2 ? '/mtn-sme-2-data-orders' : mtn_cg ? '/mtn-corporate-orders' : coup ? '/mtn-coupon-data-orders' : '/mtn-sme-2-data-orders',
            orderDetails: {
                data: { ...body }
            },
            enqueueSnackbar,
            setshowAlert,
            setErrorAlert: setshowErrorAlert
        }));

        resetForm({ values: { ...INITIAL_FORM_VALUES } });

        if (pinRef.current && pinRef.current.clear) {
            pinRef.current.clear();
        } else if (pinRef.current) {
            pinRef.current.values = '';
        }
    };

    return (
        <MainCard title={title}>
            <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                enableReinitialize={true}
                onSubmit={
                    sme ? handleSubmit : sme_2 ? handleSubmit : mtn_cg ? handleSubmit : coup ? handleSubmit : cg ? sendCgdata : sendGiftData
                }
                validationSchema={VALIDATIONS}
            >
                {({ values, setFieldValue }) => (
                    <Form>
                        <Box sx={{ maxWidth: 500, height: '100vh' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <CustomTextField name="beneficiaryNum" label="Beneficiary Number" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomSelect
                                        name="plan"
                                        options={returnPlan({ network, sme, sme_2, mtn_cg, coup, cg })}
                                        label="Select Plan"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        name="amount"
                                        disabled
                                        value={(values.amount = values.plan.price)}
                                        placeholder="Amount"
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'block' }}>
                                <CustomTextField name="network" disabled value={(values.network = network)} placeholder="Network" />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Enter Transaction Pin</Typography>
                                    <PinInput
                                        style={{
                                            margin: 'auto'
                                        }}
                                        length={4}
                                        initialValue=""
                                        ref={pinRef}
                                        secret
                                        type="tel"
                                        inputMode="numeric"
                                        onChange={(value, index) => {
                                            setPin(value);
                                        }}
                                        inputStyle={{ borderColor: 'black' }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        onComplete={(value, index) => {}}
                                        autoSelect={true}
                                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomButton
                                       disabled={loading || Cgdataloading || dataGiftloading}
                                       loading={loading || Cgdataloading || dataGiftloading}
                                      >
                                          Submit
                                       </CustomButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>
            {
                <FeedBack
                    setshowAlert={setshowAlert}
                    showAlert={showAlert}
                    message={data?.data?.message || dataGiftData?.data?.message || CgData?.data?.message}
                    variant="success"
                />
            }
            {
                <FeedBack
                    setshowErrorAlert={setshowErrorAlert}
                    showErrorAlert={showErrorAlert}
                    message={error || dataGiftError || CgdataError}
                    variant="error"
                />
            }
        </MainCard>
    );
};

export default BuyData;

