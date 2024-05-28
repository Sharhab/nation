import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified'; // You can use any appropriate icon

const BvnVerificationStatus = ({ user }) => {
    if (!user?.hasAccountNum) {
        return null;
    }

    return (
        <Box textAlign="center">
            {user.updateBvn ? (
                <>
                    <Typography variant="h5" gutterBottom>
                        Virtual Account Update:
                    </Typography>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <Typography variant="subtitle1" color="primary" display="flex" alignItems="center">
                            Status: 
                            <VerifiedIcon style={{ marginLeft: '8px' }} />
                        </Typography>
                    </Box>
                </>
            ) : (
                <Typography variant="subtitle1">
                    <Link to="/verifyBvn" style={{ textDecoration: 'none', color: 'red' }}>
                        To update your virtual accounts, as required
                        by the CBN CLICK HERE
                    </Link>
                </Typography>
            )}
        </Box>
    );
};

export default BvnVerificationStatus;
