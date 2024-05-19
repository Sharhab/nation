import { Grid, useMediaQuery } from '@mui/material';
import { Form, Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { UpdateUserAction, userAction } from '../../store/actions';
import { CustomButton, CustomTextField } from '../../ui-component/basic-inputs';
import MainCard from '../../ui-component/cards/MainCard';
import * as yup from 'yup';

const EditProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {

        dispatch(userAction({ navigate }));
    }, [navigate, dispatch]);
    const { loggedInUser, updateUser } = useSelector((state) => state);
    const { user, loading } = loggedInUser;
    const { Update_user_loading } = updateUser;
    const matches = useMediaQuery('(min-width:600px)');

    const INITIAL_UPADATE_FORM_VALUES = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user?.username,
        email: user?.email,
        phone_number: user?.phone_number
    };

    const UPDATE_VALIDATIONS = yup.object().shape({
        first_name: yup.string().typeError('First name must be a strinig'),
        last_name: yup.string().typeError('First name must be a strinig'),
        username: yup.string().typeError('Usrname name must be a strinig'),
        email: yup.string().email('Must be a valid email').max(255),
        phone_number: yup.string()
    });

    const handleUpdate = (values) => {
        dispatch(UpdateUserAction({ user: values, enqueueSnackbar }));
    };

    return (
        <MainCard
            title=" Edit Your Profile"
            sx={{
                width: matches ? '50%' : '100%',
                overflowY: 'scroll'
            }}
        >
            <Formik initialValues={{ ...INITIAL_UPADATE_FORM_VALUES }} onSubmit={handleUpdate} validationSchema={UPDATE_VALIDATIONS}>
                {({ values, setFieldValue }) => (
                    <Form>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                                <CustomTextField name="first_name" label="First Name" />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                                <CustomTextField name="last_name" label="First Name" />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                                <CustomTextField name="username" label="Username" />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                                <CustomTextField name="email" label="Email" />
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ mt: 2 }}>
                                <CustomTextField name="phone_number" label="Phone Number" />
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <CustomButton disabled={loading || Update_user_loading ? true : false}>Submit</CustomButton>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </MainCard>
    );
};

export default EditProfile;
