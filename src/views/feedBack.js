import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { generateMonnifyAccount } from '../store/actions';

const FeedBack = ({
    title,
    type,
    message,
    from,
    goHome,
    showAlert,
    setshowAlert,
    showErrorAlert,
    setshowErrorAlert
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading } = useSelector((state) => state.monnifyAccountGeneration);
    const [bvn, setBvn] = useState('');
    const [showBvnInput, setShowBvnInput] = useState(false);

    const onClickGenerate = () => {
        setShowBvnInput(true);
    };

    const onChangeBvn = (event) => {
        setBvn(event.target.value);
    };

    const onGenerateAccount = async () => {
        await dispatch(generateMonnifyAccount({ enqueueSnackbar, navigate, bvn }));
        setshowAlert(false);
    };

    const SuccessFullAlert = () => {
        return (
            <SweetAlert
                type={type ? 'info' : 'success'}
                title={title || 'Successful!'}
                show={showAlert}
                onCancel={() => setshowAlert(false)}
                onConfirm={() => {}}
                customButtons={
                    showBvnInput ? (
                        <Button
                            fullWidth
                            onClick={onGenerateAccount}
                            variant="contained"
                            color="primary"
                            disabled={loading || bvn.trim() === ''}
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            onClick={onClickGenerate}
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            Generate now
                        </Button>
                    )
                }
            >
                {showBvnInput ? (
                    <>
                        <Typography variant="subtitle1">
                            Please enter your BVN to continue the account generation process. This is required to ensure your identity and secure your account.
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Enter BVN"
                            variant="outlined"
                            value={bvn}
                            onChange={onChangeBvn}
                            type="number"
                        />
                    </>
                ) : (
                    <Typography variant="subtitle1">{message}</Typography>
                )}
            </SweetAlert>
        );
    };

    if (showAlert) {
        return <SuccessFullAlert />;
    } else if (showErrorAlert) {
        return <FailureAlert message={message} />;
    } else {
        return null;
    }
};

export default FeedBack;
