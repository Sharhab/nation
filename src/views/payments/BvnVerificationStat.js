import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified'; // You can use any appropriate icon

const BvnVerificationStatus = ({ user }) => {
    if (!user?.hasAccountNum) {
        return null;
    }

    return (
        <div>
            {user.updateBvn ? (
                <Typography variant="subtitle1" color="primary" display="flex" alignItems="center">
                    <VerifiedIcon style={{ marginRight: '8px' }} />
                    BVN Verified
                </Typography>
            ) : (
                <Typography variant="subtitle1">
                    <Link to="/verifyBvn" style={{ textDecoration: 'none', color: 'red' }}>
                        Verify your BVN. This is required by CBN to secure your account.
                    </Link>
                </Typography>
            )}
        </div>
    );
};

export default BvnVerificationStatus;
