import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de'; 
import React, { useState, useEffect } from 'react';
// project imports
import NavigationScroll from './layout/NavigationScroll';
import { useSelector } from 'react-redux';
// routing
import Routes from './routes';  
// defaultTheme
import themes from './themes';
// third party packages
import { SnackbarProvider } from 'notistack';
import './app.css';
//import './assets/fonts/avant.otf'; 

// ==============================|| APP ||============================== //

const App = () => {
    const { customization } = useSelector((state) => state);
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showInstallButton, setShowInstallButton] = useState(false);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstallClick = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            setDeferredPrompt(null);
            setShowInstallButton(false);
        }
    };
    
    return (
        <SnackbarProvider maxSnack={2} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes(customization)}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
                        <CssBaseline />
                        <NavigationScroll>
                            <Routes />
                            {showInstallButton && (
                                <div style={{ position: 'fixed', right: '10px', bottom: '10px' }}>
                                    <button onClick={handleInstallClick} style={{ padding: '10px', fontSize: '16px' }}>
                                        Install App
                                        <span role="img" aria-label="install" style={{ marginLeft: '8px' }}>⬇️</span>
                                    </button>
                                </div>
                            )}
                        </NavigationScroll>
                    </LocalizationProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </SnackbarProvider>
    );
};

export default App;
