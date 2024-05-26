import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyAirtime, userAction } from '../../store/actions';
import { CustomButton, CustomTextField } from '../../ui-component/basic-inputs';
import MainCard from '../../ui-component/cards/MainCard';
import { generateRequestId } from '../../utils/generateRequestId';
import * as yup from 'yup';
import FeedBack from '../feedBack';

const planMapping = {
    MTN: { 100: 2, 200: 3 },
    '9MOBILE': { 100: 5, 200: 4 },
    GLO: { 100: 6, 200: 7 },
    AIRTEL: { 100: 8, 200: 9 }
};

const validAmounts = {
    MTN: [100, 200],
    '9MOBILE': [100, 200],
    GLO: [100, 200],
    AIRTEL: [100, 200]
};

const BuyAirtime = ({ title, network }) => {
    const { airtimeOrder } = useSelector((state) => state);
    const { loading, airtime, error } = airtimeOrder;
    const { enqueueSnackbar } = useSnackbar();
    const [showAlert, setShowAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [pin, setPin] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction({ navigate }));
    }, [navigate, dispatch]);

    const INITIAL_FORM_VALUES = {
        beneficiary: '',
        amount: '',
        network: network,
        pin: ''
    };

    const VALIDATIONS = yup.object().shape({
        beneficiary: yup
            .string()
            .matches(/^\d+$/, 'Only numbers are allowed')
            .max(11, 'Maximum 11 characters allowed')
            .min(11, 'Number is not complete')
            .required('Please enter beneficiary number'),
        amount: yup
            .number()
            .integer()
            .required('Please enter airtime amount')
            .typeError('Amount must be a number'),
        network: yup.string().required('Please select a network')
    });

    const handleSubmit = (values) => {
        if (pin === '') {
            enqueueSnackbar('Provide transaction pin to proceed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }

        const selectedPlanId = planMapping[network]?.[values.amount];

        if (!selectedPlanId) {
            enqueueSnackbar(`Invalid amount for the selected network. Valid amounts are: ${validAmounts[network].join(', ')}`, {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }

        const body = {
            beneficiary: values.beneficiary,
            serviceID: selectedPlanId,  // Use the plan ID
            request_id: generateRequestId(),
            amount: values.amount,  // The amount to be purchased
            network: network,  // Pass the network name
            pin: pin
        };

        dispatch(
            buyAirtime({
                orderDetails: { data: body },
                enqueueSnackbar,
                setShowAlert,
                setShowErrorAlert
            })
        );
    };

    return (
        <MainCard title={title}>
            <Formik initialValues={INITIAL_FORM_VALUES} onSubmit={handleSubmit} validationSchema={VALIDATIONS}>
                {({ isValid }) => (
                    <Form>
                        <Box sx={{ maxWidth: 500, height: '100vh' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <CustomTextField name="beneficiary" label="Beneficiary Number" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField name="amount" label="Airtime Amount" />
                                </Grid>
                                <Grid item xs={12} style={{ display: 'none' }}>
                                    <CustomTextField name="network" label="Network" value={network} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Enter Transaction Pin</Typography>
                                    <PinInput
                                        style={{ margin: 'auto' }}
                                        length={4}
                                        initialValue=""
                                        secret
                                        onChange={(value) => setPin(value)}
                                        type="numeric"
                                        inputMode="numeric"
                                        inputStyle={{ borderColor: 'black' }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        autoSelect
                                        regexCriteria={/^[0-9]{4}$/}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomButton color="primary" disabled={loading || !isValid} loading={loading}>
                                        Submit
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>
            <FeedBack setshowAlert={setShowAlert} showAlert={showAlert} message={airtime?.data?.message} variant="success" />
            <FeedBack setshowErrorAlert={setShowErrorAlert} showErrorAlert={showErrorAlert} message={error} variant="error" />
        </MainCard>
    );
};

export default BuyAirtime;
