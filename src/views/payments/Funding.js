import { Button, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { fundWalletWithMonnify, userAction } from '../../store/actions';
import { CustomTextField } from '../../ui-component/basic-inputs';
import MainCard from '../../ui-component/cards/MainCard';
import FeedBack from '../feedBack';
import * as yup from 'yup';
import AccountDetails from './AccountDetail'; // Import the new component

const Funding = () => {
    const { fundWithMonnify, loggedInUser, login } = useSelector((state) => state);
    const { user } = loggedInUser;
    const { isLoggedIn } = login;
    const { loading } = fundWithMonnify;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [showAlert, setshowAlert] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/pages/login');
        }
        dispatch(userAction({ navigate }));
    }, [navigate, dispatch, isLoggedIn]);

    useEffect(() => {
        if (Object.keys(user).length === 0) return;
        if (!user?.hasAccountNum) {
            setshowAlert(true);
        }
    }, [user]);

    const INITIAL_FORM_VALUES = {
        amount: ''
    };
    const VALIDATIONS = yup.object().shape({
        amount: yup.number().integer().required('Please enter amount to fund').typeError('amount must be a number')
    });
    const handleSubmit = ({ values, gateway }) => {
        dispatch(
            fundWalletWithMonnify({
                amount: {
                    data: { ...values, gateway }
                },
                enqueueSnackbar
            })
        );
    };

    return (
        <MainCard title="Fund Wallet By Transferring To Your Unique Account Number Or With Monnify, Credo or Flutter Wave">
            {user?.hasAccountNum && (
                <>
                    <Typography variant="h4" sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 0.4, mt: 1, mb: 1.75 }}>
                        Bank Transfer
                    </Typography>
                    <Typography variant="body" color="initial" sx={{ fontSize: '1.1rem', fontWeight: 200, mr: 0.4, mt: 10, mb: 1.75 }}>
                        These are your unique account numbers, you can always transfer to it anytime and it will reflect immediately
                        and automatically in your wallet. Note: Charges of 1.60% will be deducted from amount deposited.
                    </Typography>
                </>
            )}
            {user?.hasAccountNum ? (
                <AccountDetails accounts={user.monnify_bank_details} /> // Use the new component
            ) : (
                <></>
            )}
            <Typography variant="h4" sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 0.4, mt: 1, mb: 1.75 }}>
                Monnify
            </Typography>
            <Typography variant="body" color="initial" sx={{ fontSize: '1.1rem', fontWeight: 200, mr: 0.4, mt: 10, mb: 1.75 }}>
                Enter amount to fund and you will be redirected to monnify payment gateway.
            </Typography>
            <Formik
                initialValues={{ ...INITIAL_FORM_VALUES }}
                onSubmit={handleSubmit}
                validationSchema={VALIDATIONS}
                enableReinitialize={true}
            >
                {({ values }) => (
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={6} sx={{ mt: 2 }}>
                                <CustomTextField fullWidth={true} name="amount" label="Amount" />
                            </Grid>
                        </Grid>
                        <Button
                            disabled={loading}
                            onClick={() => handleSubmit({ values, gateway: 'monify' })}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Pay Now
                        </Button>
                    </Form>
                )}
            </Formik>
            <FeedBack
                title={'Account Transfer Now Available'}
                message={'Generate your monnify funding bank account number now'}
                type="info"
                setshowAlert={setshowAlert}
                showAlert={showAlert}
                goHome={false}
                from={'fund'}
            />
        </MainCard>
    );
};

export default Funding;
