import { Avatar, Box, ButtonBase } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';
// assets
import { IconMenu2 } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
// project imports
import LogoSection from '../LogoSection';
import ProfileSection from './ProfileSection';




// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ handleLeftDrawerToggle }) => {
    const { loggedInUser } = useSelector((state) => state);
    const { user } = loggedInUser;
    const theme = useTheme();

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            {/* logo & toggler button */}
            <Box
                sx={{
                    width: 228,
                    display: 'flex',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down('md')]: {
                        width: 'auto'
                    }
                }}
            >
                <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
                    {/* <LogoSection /> */}
                    <typography variant='h1' sx={{
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    color: theme.palette.primary.dark,
                    fontsize: theme.palette.fontsize,
                    '&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.primary.light
                    }
                }}
>
                        SdataPlus
                    </typography>
                </Box>

                <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                    <Avatar
                        variant="rounded"
                sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    transition: 'all .2s ease-in-out',
                    background: theme.palette.primary.light,
                    color: theme.palette.primary.dark,
                    '&:hover': {
                        background: theme.palette.primary.dark,
                        color: theme.palette.primary.light
                    }
                }}
                        onClick={handleLeftDrawerToggle}
                        color="inherit"
                    >
                        <IconMenu2 stroke={1.5} size="1.3rem" />
                    </Avatar>
                </ButtonBase>
                </Box>

            {/* header search */}
            {/* <SearchSection /> */}
            <Box sx={{ flexGrow: 1, position: 'absolute', right:'10%'}}>
            <ProfileSection user={user} />
            </Box>
           

            {/* <Box sx={{ flexGrow: 1 }}>

            </Box> */}

            {/* notification & profile */}
            {/* <NotificationSection /> */}
         
        </Box>
    );
};

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
