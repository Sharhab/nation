import { Box, Grid } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UpdateBvn, userAction } from '../store/actions';
import { CustomButton, CustomTextField } from '../ui-component/basic-inputs';
import MainCard from '../ui-component/cards/MainCard';
import * as yup from 'yup';

const VerifyAccounts = () => {
    const { updateUser, login } = useSelector((state) => state);
    const { Update_user_loading } = updateUser; 
    const { isLoggedIn } = login;
    const { enqueueSnackbar } = useSnackbar();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!isLoggedIn) {
            return navigate('/pages/login', { replace: true });
        }
        dispatch(userAction({ navigate }));
    }, [navigate, dispatch, isLoggedIn]);

    const INITIAL_FORM_VALUES = {
        bvn: ''
    };
    const VALIDATIONS = yup.object().shape({
        bvn: yup.string().required('Please enter your BVN number')
    });

    const handleSubmit = (values) => {
        dispatch(
            UpdateBvn({
                navigate,
                bvn: {
                    bvn: values.bvn // Ensure the BVN is wrapped in an object with the correct key
                },
                enqueueSnackbar
            })
        );
    };

    return (
        <MainCard title="Verify Account">
            <Formik initialValues={{ ...INITIAL_FORM_VALUES }} onSubmit={handleSubmit} validationSchema={VALIDATIONS}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Box sx={{ maxWidth: 500, height: '100vh' }}>
                            <Grid container spacing={4}>
                                <Grid item xs={12}>
                                    <CustomTextField name="bvn" label="BVN Number" />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomButton color="primary" disabled={Update_user_loading}>
                                        Submit
                                    </CustomButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Form>
                )}
            </Formik>
        </MainCard>
    );
};

export default VerifyAccounts;
