import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified'; // You can use any appropriate icon

const BvnVerificationStatus = ({ user }) => {
    if (!user?.hasAccountNum !user?.updateBvn) {
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
                        To update your virtual accounts, as required
                         by the CBN CLICK HERE
                    </Link>
                </Typography>
            )}
        </div>
    );
};

export default BvnVerificationStatus;
