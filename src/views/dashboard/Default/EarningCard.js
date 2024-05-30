import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Grid, Menu, MenuItem, Typography, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import EarningIcon from '../../../assets/images/icons/earning.svg';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    background: 'linear-gradient(to right, orange, blue, red)',
    color: 'white',
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: 'rgba(255, 255, 255, 0.1)',
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
        background: 'rgba(255, 255, 255, 0.1)',
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

const EarningCard = ({ isLoading }) => {
    const { loggedInUser, login } = useSelector((state) => state);
    const { user } = loggedInUser;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showBalance, setShowBalance] = useState(true);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickShowPassword = () => {
        setShowBalance(!showBalance);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
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
                                                background: 'linear-gradient(to right, orange, blue, red)',
                                                color: 'white',
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
                                                background: 'linear-gradient(to right, orange, blue, red)',
                                                color: 'white',
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
                                        {login.isLoggedIn && user.username && (
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, color: 'white' }}>
                                                {`Welcome Back, ${user.username}`}
                                            </Typography>
                                        )}
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography sx={{ fontSize: '1.2rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, color: 'white' }}>
                                                {login.isLoggedIn && showBalance ? `Wallet Balance: ₦${(user?.accountBalance ?? 0).toFixed(2)}` : 'Wallet Balance: *******'}
                                            </Typography>
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                                size="large"
                                                sx={{ color: 'white' }}
                                            >
                                                {showBalance ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </div>
                                        {login.isLoggedIn ? (
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
                                                        <Typography sx={{ fontSize: '1.0rem', fontWeight: 500, mb: 1.75, mt: 1.75, color: 'white' }}>
                                                            Fund Wallet
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Avatar
                                                            sx={{
                                                                mb: 1.75,
                                                                mt: 1.75,
                                                                cursor: 'pointer',
                                                                ...theme.typography.smallAvatar,
                                                                background: 'linear-gradient(to right, orange, blue, red)',
                                                                color: 'white'
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
                                        ) : (
                                            <Link to={'/pages/login'}>
                                                <Typography variant="subtitle1" sx={{ color: 'white' }}>
                                                    Please Login To Your Account
                                                </Typography>
                                            </Link>
                                        )}
                                    </Grid>
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
