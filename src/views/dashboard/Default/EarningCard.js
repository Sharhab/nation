

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Grid, Menu, MenuItem, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import EarningIcon from '../../../assets/images/icons/earning.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -85,
        right: -95,
        [theme.breakpoints.down('sm')]: {
            top: -105,
            right: -140
        }
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: theme.palette.primary[800],
        borderRadius: '50%',
        top: -125,
        right: -15,
        opacity: 0.5,
        [theme.breakpoints.down('sm')]: {
            top: -155,
            right: -70
        }
    }
}));

const EarningCard = ({ isLoading, message }) => {
    const { loggedInUser, userStat } = useSelector((state) => state);
    const { user } = loggedInUser;
    const { isLoggedIn } = userStat;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBalance, setShowBalance] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const toggleBalanceVisibility = () => {
        setShowBalance(!showBalance);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2.25 }}>
                        <Grid container direction="column">
                            <Grid item>
                                <Grid container justifyContent="space-between">
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.largeAvatar,
                                                backgroundColor: theme.palette.primary[800],
                                                mt: 1
                                            }}
                                        >
                                            <img src={EarningIcon} alt="Notification" />
                                        </Avatar>
                                    </Grid>
                                    <Grid item>
                                        <Avatar
                                            variant="rounded"
                                            sx={{
                                                ...theme.typography.commonAvatar,
                                                ...theme.typography.mediumAvatar,
                                                backgroundColor: theme.palette.primary.dark,
                                                color: theme.palette.primary[200],
                                                zIndex: 1
                                            }}
                                            aria-controls="menu-earning-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        >
                                            <MoreHorizIcon fontSize="inherit" />
                                        </Avatar>
                                        <Menu
                                            id="menu-earning-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}>
                                                <FileCopyTwoToneIcon sx={{ mr: 1.75 }} /> Copy Account Number
                                            </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid container alignItems="center">
                                    <Grid item>
                                        {isLoggedIn && user?.username && (
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {`Welcome Back, ${user?.username}`}
                                            </Typography>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                                                {isLoggedIn && showBalance ? `Wallet Balance: ₦${user?.accountBalance}` : 'Wallet Balance: ****'}
                                            </Typography>
                                            <Avatar
                                                sx={{
                                                    ...theme.typography.smallAvatar,
                                                    ml: 1,
                                                    cursor: 'pointer',
                                                    backgroundColor: theme.palette.secondary[800],
                                                    color: theme.palette.secondary[200]
                                                }}
                                                onClick={toggleBalanceVisibility}
                                            >
                                                {showBalance ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                                            </Avatar>
                                        </div>
                                       {isLoggedIn ? (
                                            <>
                                                <Link
                                                    to={'/fund-wallet'}
                                                    style={{
                                                        textDecoration: 'none',
                                                        color: 'white',
                                                        position: 'relative',
                                                        top: 6,
                                                        bottom: 0
                                                    }}
                                                >
                                                    <Grid container columnSpacing={-11}>
                                                        <Grid item xs={6}>
                                                            <Typography sx={{ fontSize: '1.0rem', fontWeight: 500, mb: 1.75, mt: 1.75 }}>
                                                                Fund Wallet
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <Avatar
                                                                sx={{
                                                                    mb: 1.75,
                                                                    mt: 1.75,
                                                                    // position: 'relative',
                                                                    // top: 6,
                                                                    // bottom: 0,
                                                                    cursor: 'pointer',
                                                                    ...theme.typography.smallAvatar,
                                                                    backgroundColor: theme.palette.primary[200],
                                                                    color: theme.palette.primary.dark
                                                                }}
                                                            >
                                                                <ArrowUpwardIcon
                                                                    fontSize="inherit"
                                                                    sx={{ transform: 'rotate3d(1, 1, 1, 45deg)' }}
                                                                />
                                                            </Avatar>
                                                        </Grid>
                                                    </Grid>
                                                </Link>

                                                //<marquee
                                                   // style={{
                                                      //  backgroundColor: 'red',
                                                      //  marginTop: 1.7,
                                                      //  marginBottom: 0.25,
                                                      //  padding: '5px 0',
                                                      //  borderRadius: '5px'
                                                  //  }}
                                               // >
                                                  //  <Typography sx={{ fontSize: '1.0rem' }}>{message ? message : ''}</Typography>
                                               // </marquee>
                                            </>
                                        ) : (
                                            <Link to={'/pages/login'}>
                                                <Typography variant="subtitle1" color={'white'}>
                                                    Please Login To Your Account
                                                </Typography>
                                            </Link>
                                        )}
                                    </Grid>
                                    {/* <Grid item>
                                  
                                    </Grid> */}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </CardWrapper>
            )}
        </>
                                                    
    );
};

EarningCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EarningCard;
