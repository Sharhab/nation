// material-ui
import { Box, Grid, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import PinInput from 'react-pin-input';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { buyAirtime, userAction } from '../../store/actions';
import { CustomButton, CustomTextField } from '../../ui-component/basic-inputs';
// project imports
import MainCard from '../../ui-component/cards/MainCard';
import { generateRequestId } from '../../utils/generateRequestId';
import * as yup from 'yup';
import FeedBack from '../feedBack';

// ==============================|| SAMPLE PAGE ||============================== //

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
        !Cookies.get('user') && navigate('/pages/login');
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
            .min(11, 'number is not complete')
            .required('Please enter beneficiary number'),
        amount: yup.number().integer().required('Please enter airtime amount').typeError('amount must be a number'),

        network: yup.string()
    });

    const handleSubmit = (values) => {
        if (pin === '') {
            enqueueSnackbar('provide transaction pin to proceed', {
                variant: 'error',
                autoHideDuration: 2000
            });
            return;
        }
  let network_amount;
  if (values.network === 'mtn' && values.amount === 100){
        network_amount = 1
    }else if(values.network ==='mtn'&& values.amount === 200){
        network_amount = 2
    }else if(values.network ==='mtn'&& values.amount === 500){
        network_amount = 3
    }else if(values.network ==='glo'&& values.amount === 100){
        network_amount = 4
    }else if(values.network ==='glo'&& values.amount === 200){
        network_amount = 5
    }else if(values.network ==='glo'&& values.amount === 500){
        network_amount = 6
    }else if(values.network ==='airtel'&& values.amount === 100){
        network_amount = 10
    }else if(values.network ==='airtel'&& values.amount === 200){
        network_amount = 11;
    }else if(values.network ==='airtel'&& values.amount === 500) {
        network_amount = 12;
    }else{
      network_amount = null;  
    }

    console.log(network_amount)
        const body = {
            beneficiary: values.beneficiary,
            serviceID: values.network,
            request_id: generateRequestId(),
            amount: values.amount,
            network_amount,
            network: values.network,
            network_id: values.network_id,
            pin: pin
        };

        dispatch(
            buyAirtime({
                orderDetails: {
                    data: body
                },
                enqueueSnackbar,
                setshowAlert,
                setErrorAlert: setshowErrorAlert
            })
        );
  

    };

    return (
        <MainCard title={title}>
            <Formik initialValues={{ ...INITIAL_FORM_VALUES }} onSubmit={handleSubmit} validationSchema={VALIDATIONS}>
                {({ values, setFieldValue }) => (
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
                                    <CustomTextField name="network" label="Network" value={(values.network = network)} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography>Enter Transaction Pin</Typography>
                                    <PinInput
                                        style={{
                                            margin: 'auto'
                                        }}
                                        length={4}
                                        initialValue=""
                                        secret
                                        onChange={(value, index) => {
                                            setPin(value);
                                        }}
                                        type="numeric"
                                        inputMode="number"
                                        inputStyle={{ borderColor: 'black' }}
                                        inputFocusStyle={{ borderColor: 'blue' }}
                                        onComplete={(value, index) => {}}
                                        autoSelect={true}
                                        regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomButton color="primary" 
                                            disabled={loading ? true : false}
                                            loading={loading ? true : false}
                                        >
                                        Submit
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>

            {<FeedBack setshowAlert={setshowAlert} showAlert={showAlert} message={airtime?.data?.message} variant="success" />}
            {<FeedBack setshowErrorAlert={setshowErrorAlert} showErrorAlert={showErrorAlert} message={error} variant="error" />}
        </MainCard>
    );
};

export default BuyAirtime;
