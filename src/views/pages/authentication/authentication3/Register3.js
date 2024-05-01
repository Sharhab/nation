import React from 'react';
import { Button, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import AuthRegister from '../auth-forms/AuthRegister';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
//import logo from '../../../../assets/images/user-round.png';

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    // State to manage the PIN input
    //const [pin, setPin] = useState('');

    // Handler to set the PIN value
    //const handlePinChange = (event) => {
     //   setPin(event.target.value);
   // };

    return (
        <AuthWrapper1>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    {/* Pass the pin value and pin change handler to AuthRegister */}
                    {/* <AuthRegister onPinChange={handlePinChange} onRegister={() => handleRegister(pin)} /> */}
    
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3, mt: 10 }}>
                                        <Link
                                            to="#"
                                            style={{
                                                textDecoration: 'none'
                                            }}
                                        >
                                            <Typography
                                                variant="h2"
                                                sx={{
                                                    textAlign: 'center',
                                                    textAlignLast: 'center',
                                                    color: '#83529f'
                                                }}
                                            >
                                                 SHARHADATA
                                            </Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={matchDownSM ? 'column-reverse' : 'row'}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography
                                                        style={{
                                                            textTransform: 'uppercase'
                                                        }}
                                                        variant="caption"
                                                        fontSize="16px"
                                                        s
                                                        textAlign={matchDownSM ? 'center' : 'inherit'}
                                                    >
                                                        Enter your details to register
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        {/* Keep your AuthRegister component here */}
                                        <AuthRegister />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid item container direction="column" alignItems="center" xs={12}>
                                            <Button
                                                onClick={() => {
                                                    navigate('/pages/login');
                                                }}
                                                sx={{
                                                    textTransform: 'uppercase',
                                                    borderRadius: '30px',
                                                    backgroundColor: {
                                                        backgroundColor: '#83529f',
                                                        ':hover': {
                                                            backgroundColor: '#83529f'
                                                        }
                                                    }
                                                }}
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                            >
                                                Sign in here !!.
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <div
                                    style={{
                                        backgroundColor: '#000000',
                                        width: '120px',
                                        height: '2px',
                                        position: 'relative',
                                        bottom: 25
                                    }}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    {/* <AuthFooter /> */}
                </Grid>
            </Grid>
        </AuthWrapper1>
    );
};

export default Register;
