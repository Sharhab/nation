// material-ui
import { ButtonBase, Typography } from '@mui/material';
// project imports
import config from '../../../../src/config';
import { Link } from 'react-router-dom';
import Logo from '../../../ui-component/Logo';



// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => (
    <>
        <ButtonBase disableRipple component={Link} to={config.defaultPath}>
            <Logo />
           {/* <Typography variant="h3">GBrain Ventures</Typography>  */}
        </ButtonBase>        
    </>
);

export default LogoSection;
