import React, { useState, useRef } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { generateMonnifyAccount } from '../store/actions';
import { CustomButton } from './menu-items/basic-input'
const FeedBack = ({
    title,
    type,
    message,
    from,
    goHome,
    showAlert,
    setshowAlert,
    showErrorAlert,
    setshowErrorAlert,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { loading } = useSelector((state) => state.monnifyAccountGeneration);
    const [bvn, setBvn] = useState('');
    const [bvnInputShown, setBvnInputShown] = useState(false);
    const bvnInputRef = useRef(null);

    const onClickSuccess = (goHome) => {
        setshowAlert(false);
        if (goHome) {
            navigate('/');
        }
    };

    const onClickGenerate = () => {
        setBvnInputShown(true);
    };

    const onChangeBvn = (event) => {
        setBvn(event.target.value);
    };

    const onGenerateAccount = async () => {
        await dispatch(generateMonnifyAccount({ bvn, enqueueSnackbar, navigate }));
        setBvn('');
        setBvnInputShown(false);
        setshowAlert(false);
    };

    const onClickFailure = () => {
        setshowErrorAlert(false);
    };

    const SuccessFullAlert = () => {
        return (
            <SweetAlert
                type={type ? 'info' : 'success'}
                title={title || 'Successful!'}
             owAlert}
                onCancel={() => setshowAlert(false)}
                onConfirm={onClickSuccess}
                customButtons={
                    <>
                        {bvnInputShown ? (
                            <Button
                                fullWidth
                                onClick={onGenerateAccount}
                                variant="contained"
                                color="primary"
                                disabled={loading || bvn.trim().length < 11}
                            >
                                Submit
                            </Button>
                        ) : (
                            <CustomButton
                                fullWidth
                                onClick={onClickGenerate}
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                loading= {loading}       
                            >
                                {from === 'fund' ? 'Generate now' : 'Ok'}
                            </CustomButton>
                        )}
                    </>
                }
            >
                <br />
                {bvnInputShown ? (
                    <>
                        <Typography variant="subtitle1">
                            Please enter your BVN to continue the account generation process. This is required to ensure your identity and secure your account.
                        </Typography>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Enter BVN"
                            variant="outlined"
                            inputMode="numeric"
                            value={bvn}
                            onChange={onChangeBvn}
                            type="tel"
                            inputRef={bvnInputRef}
                            autoFocus
                        />
                    </>
                ) : (
                    <Typography variant="subtitle1">{message}</Typography>
                )}
            </SweetAlert>
        );
    };

    const FailureAlert = () => {
        return (
            <SweetAlert
                danger
                show={showErrorAlert}
                confirmBtnText="Yes, delete it!"
                confirmBtnBsStyle="danger"
                title="Failed"
                onConfirm={onClickFailure}
                onCancel={onClickFailure}
                focusCancelBtn
                customButtons={
                    <Button onClick={onClickFailure} variant="contained" color="primary">
                        Ok
                    </Button>
                }
            >
                <Typography variant="subtitle1">{message}</Typography>
            </SweetAlert>
        );
    };

    if (showAlert) {
        // Focus the BVN input field programmatically if it's shown
        if (bvnInputShown && bvnInputRef.current) {
            bvnInputRef.current.focus();
        }
        return <SuccessFullAlert />;
    } else if (showErrorAlert) {
        return <FailureAlert />;
    } else {
        return null;
    }
};

export default FeedBack;
