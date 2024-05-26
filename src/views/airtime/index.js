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

const networkIDs = {
    MTN: 1,
    GLO: 2,
    '9MOBILE': 3,
    AIRTEL: 4
};

const validAmounts = {
    1: [100, 200, 500], // MTN
    2: [100, 200, 500], // GLO
    3: [100, 200],      // 9MOBILE
    4: [100, 200, 500]  // AIRTEL
};

const BuyAirtime = ({ title, network }) => {
    const { airtimeOrder } = useSelector((state) => state);
    const { loading, airtime, error } = airtimeOrder;
    const { enqueueSnackbar } = useSnackbar();
    const [showAlert, setshowAlert] = useState(false);
    const [showErrorAlert, setshowErrorAlert] = useState(false);
    const [pin, setPin] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAction({ navigate }));
    }, [navigate, dispatch]);

    const networkId = networkIDs[network] || 1; // Default to MTN if network is not recognized

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
            .typeError('Amount must be a number')
            .oneOf(validAmounts[networkId], `Invalid amount for the selected network. Valid amounts are: ${validAmounts[networkId].join(', ')}`),
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

        const body = {
            beneficiary: values.beneficiary,
            serviceID: networkId,  // Use network ID
            request_id: generateRequestId(),
            amount: values.amount,  // The amount to be purchased
            network: networkId,  // Use network ID
            pin: pin
        };

        dispatch(
            buyAirtime({
                orderDetails: { data: body },
                enqueueSnackbar,
                setshowAlert,
                setErrorAlert: setshowErrorAlert
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
                                        type="tel"
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
            <FeedBack setshowAlert={setshowAlert} showAlert={showAlert} message={airtime?.data?.message} variant="success" />
            <FeedBack setshowErrorAlert={setshowErrorAlert} showErrorAlert={showErrorAlert} message={error} variant="error" />
        </MainCard>
    );
};

export default BuyAirtime;
