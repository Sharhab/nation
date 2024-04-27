import React, { useState } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Make sure to use 'react-router-dom'
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

    const onClickSuccess = (goHome) => {
        setshowAlert(false);
        if (goHome) {
            navigate('/');
        }
    };

    const onClickGenerate = () => {
        if (from === 'fund') {
            setShowBvnInput(true); // Show BVN input only for 'fund' source
        } else {
            onClickSuccess(goHome); // Navigate home or perform other action
        }
    };

    const onChangeBvn = (event) => {
        setBvn(event.target.value);
    };

    const onGenerateAccount = async () => {
        await dispatch(generateMonnifyAccount({ bvn, enqueueSnackbar, navigate }));
        setShowBvnInput(false); // Hide BVN input after submission
        setshowAlert(false); // Close the alert dialog
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
                    <>
                        {showBvnInput ? (
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
                                {from === 'fund' ? 'Generate now' : 'Ok'}
                            </Button>
                        )}
                    </>
                }
            >
                <br />
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

    const FailureAlert = ({ message }) => {
        return (
            <SweetAlert
                danger
                show={showErrorAlert}
                confirmBtnText="Ok"
                confirmBtnBsStyle="danger"
                title="Failed"
                onConfirm={() => setshowErrorAlert(false)}
                onCancel={() => setshowErrorAlert(false)}
                focusCancelBtn
            >
                {message}
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
