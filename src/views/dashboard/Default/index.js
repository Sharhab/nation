import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getNotificationDetails, userAction } from '../../../store/actions';
import { gridSpacing } from '../../../store/constant';
import EarningCard from './EarningCard';
import ProductListing from './ProductListing';
import { useSnackbar } from 'notistack';
import FeedBack from '../../feedBack';
import PopularCard from './PopularCard';
import AccountDetails from '../../payments/AccountDetail'; // Import the AccountDetails component

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    const { notificationDetails, login, loggedInUser } = useSelector((state) => state); // Add loggedInUser to state selection
    const { notification } = notificationDetails;
    const { isLoggedIn } = login;
    const { user } = loggedInUser; // Extract user from loggedInUser
    const { enqueueSnackbar } = useSnackbar();
    const [showAlert, setshowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(false);
        if (!isLoggedIn) {
            navigate('/pages/login');
        }

        dispatch(userAction({ navigate }));
        dispatch(getNotificationDetails({ enqueueSnackbar, setshowAlert }));
    }, [dispatch, navigate, isLoggedIn, enqueueSnackbar]);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={6} sm={6} xs={12}>
                        <br />
                        <br />
                        <EarningCard isLoading={isLoading} message={notification?.message} />
                    </Grid>
                    {/* Other grid items can be here */}
                </Grid>
            </Grid>
            {user?.hasAccountNum && (
                <Grid item xs={12}>
                    <AccountDetails accounts={user.monnify_bank_details || []} /> {/* Integrate AccountDetails here */}
                </Grid>
            )}
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} md={8}>
                        <ProductListing isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PopularCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            {
                <FeedBack
                    setshowAlert={setshowAlert}
                    showAlert={showAlert}
                    title={notification?.title}
                    message={notification?.message}
                    variant="success"
                />
            }
        </Grid>
    );
};

export default Dashboard;
