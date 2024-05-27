import { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const AccountDetails = ({ accounts }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 1;

    const handleNextPage = () => {
        if (currentPage < Math.ceil(accounts.length / accountsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
            <Typography variant="h5" gutterBottom>
                Fund Wallet By Transferring To Your Unique Account Number And it will Reflect in your Wallet immediately.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto' }}>
                {accounts.slice(currentPage * accountsPerPage, (currentPage + 1) * accountsPerPage).map((acc, index) => (
                    <Paper key={index} variant="outlined" sx={{ minWidth: 300, maxWidth: 300, margin: 1, padding: 2, textAlign: 'center' }}>
                        <Typography variant="subtitle1">Bank Name: {acc.bank_name}</Typography>
                        <Typography variant="subtitle1">Account Number: {acc.account_number}</Typography>
                        <Typography variant="subtitle1">Account Name: {acc.account_name}</Typography>
                    </Paper>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button onClick={handlePrevPage} disabled={currentPage === 0} variant="contained" color="primary">
                    Previous
                </Button>
                <Button onClick={handleNextPage} disabled={currentPage >= Math.ceil(accounts.length / accountsPerPage) - 1} variant="contained" color="primary">
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default AccountDetails;
