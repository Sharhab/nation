import { useState } from 'react';
import { Box, Button, Paper, Typography, IconButton, Tooltip } from '@mui/material';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';

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

    const handleCopyAccountNumber = (accountNumber) => {
        navigator.clipboard.writeText(accountNumber);
        alert('Account number copied to clipboard!');
    };

    return (
        <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                <Paper
                    variant="outlined"
                    sx={{
                        minWidth: 300,
                        maxHeight: 300,
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
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                {accounts.slice(currentPage * accountsPerPage, (currentPage + 1) * accountsPerPage).map((acc, index) => (
                    <Paper
                        key={index}
                        variant="outlined"
                        sx={{
                            minWidth: 300,
                            maxWidth: 300,
                            padding: 2,
                            textAlign: 'center',
                            background: 'linear-gradient(to right, orange, blue, red)',
                            color: 'white',
                            position: 'relative'
                        }}
                    >
                        <Typography variant="h3">Bank Name: {acc.bank_name}</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h3">Account Number: {acc.account_number}</Typography>
                            <Tooltip title="Copy to clipboard">
                                <IconButton
                                    onClick={() => handleCopyAccountNumber(acc.account_number)}
                                    sx={{ color: 'white', ml: 1 }}
                                >
                                    <FileCopyOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Typography variant="h3">Account Name: {acc.account_name}</Typography>
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
