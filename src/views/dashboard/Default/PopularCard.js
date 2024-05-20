import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Button, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';

// assets
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { userTransactionStatByDate } from '../../../store/actions';

const PopularCard = ({ isLoading }) => {
    const { userStatByDate } = useSelector((state) => state);
    const { stat, loading } = userStatByDate;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [value, setValue] = useState(dayjs(new Date()));

    const handleButtonClick = () => {
        dispatch(userTransactionStatByDate({ date: value.toISOString(), navigate }));
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">FETCH TRANSACTION STATISTICS</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <Typography variant="body1" sx={{ fontSize: '1rem', mb: 2, fontWeight: 500 }}>
                                    Choose Date
                                </Typography>
                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <DatePicker
                                        format="DD-MM-YYYY"
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        label="Controlled picker"
                                    />
                                    <Button disabled={loading} variant="contained" color="secondary" onClick={handleButtonClick}>
                                        Fetch
                                    </Button>
                                </div>
                            </Grid>
                            {Object.keys(stat).length !== 0 && (
                                <Grid item xs={12}>
                                    <Grid container direction="column">
                                        {[
                                            { label: 'Total data purchase', value: stat?.totaldatas },
                                            { label: 'Total Funding', value: stat?.totalfundings },
                                            { label: 'Total Airtime', value: stat?.totalairtimes },
                                            { label: 'Total Cable', value: stat?.totalcables },
                                            { label: 'Total Electricity', value: stat?.totalelelectricity }
                                        ].map((item, index) => (
                                            <div key={index}>
                                                <Grid container alignItems="center" justifyContent="space-between">
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            {item.label}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color="inherit">
                                                            ₦{item.value}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                {index < 4 && <Divider sx={{ my: 1.5 }} />}
                                            </div>
                                        ))}
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
