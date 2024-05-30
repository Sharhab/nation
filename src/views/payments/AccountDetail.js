import { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';

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
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <Paper
                    variant="outlined"
                    sx={{
                        minWidth: 300,
                        maxWidth: 600,
                        padding: 2,
                        textAlign: 'center',
                        background: 'linear-gradient(to right, orange, blue, red)',
                        color: 'white',
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        Fund Wallet By Transferring To Your Unique Account Number And it will Reflect in your Wallet immediately.
                    </Typography>
                </Paper>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                {accounts.slice(currentPage * accountsPerPage, (currentPage + 1) * accountsPerPage).map((acc, index) => (
                    <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                            minWidth: 300,
                            maxWidth: 600,
                            padding: 2,
                            textAlign: 'center',
                            background: 'linear-gradient(to right, orange, blue, red)',
                            color: 'white',
                        }}
                    >
                        <Typography variant="h3" sx={{ color: 'white' }}>Bank Name: {acc.bank_name}</Typography>
                        <Typography variant="h3" sx={{ color: 'white' }}>Account Number: {acc.account_number}</Typography>
                        <Typography variant="h3" sx={{ color: 'white' }}>Account Name: {acc.account_name}</Typography>
                    </Paper>
                ))}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Button
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(to right, orange, blue, red)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(to right, red, blue, orange)',
                        },
                    }}
                >
                    Previous
                </Button>
                <Button
                    onClick={handleNextPage}
                    disabled={currentPage >= Math.ceil(accounts.length / accountsPerPage) - 1}
                    variant="contained"
                    sx={{
                        background: 'linear-gradient(to right, orange, blue, red)',
                        color: 'white',
                        '&:hover': {
                            background: 'linear-gradient(to right, red, blue, orange)',
                        },
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default AccountDetails;
