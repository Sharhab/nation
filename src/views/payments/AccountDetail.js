import { useState } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';

const AccountDetails = ({ accounts }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const accountsPerPage = 4;

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
        <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
            <Typography variant="h5" gutterBottom>
                Fund Wallet By Transferring To Your Unique Account Number And it will Reflect in your Wallet immediately.
            </Typography>
            <Grid container spacing={3}>
                {accounts.slice(currentPage * accountsPerPage, (currentPage + 1) * accountsPerPage).map((acc, index) => (
                    <Grid key={index} item xs={12} md={3}>
                        <Paper variant="outlined" sx={{ mt: 2, py: 1.5, textAlign: 'center' }}>
                            <Typography variant="subtitle1">Bank Name: {acc.bank_name}</Typography>
                            <Typography variant="subtitle1">Account Number: {acc.account_number}</Typography>
                            <Typography variant="subtitle1">Account Name: {acc.account_name}</Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
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
