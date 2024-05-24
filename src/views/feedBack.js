import { Button, Typography, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import SweetAlert from 'react-bootstrap-sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { generateMonnifyAccount } from '../store/actions';

const FeedBack = ({
    title,
    type,
    message,
    from,
    disableTopup,
    purchasePin,
    goHome,
    showAlert,
    setshowAlert,
    showErrorAlert,
    setshowErrorAlert
}) => {
    const navigate = useNavigate();
    const [bvn, setBvn] = useState('');
    const [showBvnField, setShowBvnField] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { monnifyAccountGeneration } = useSelector((state) => state);
    const { loading } = monnifyAccountGeneration;

    const onClickSuccess = (setshowAlert, goHome) => {
        setshowAlert((prevAlert) => !prevAlert);
        if (goHome) {
            navigate('/');
        }
    };

    const onClickFailure = () => {
        setshowErrorAlert(false);
    };

    const handleBvnSubmit = async () => {
        await dispatch(generateMonnifyAccount({ enqueueSnackbar, navigate, bvn }));
        setshowAlert(false);
    };

    const SuccessFullAlert = ({ title, message, from }) => {
        return (
            <SweetAlert
                style={{ width: '500px', position: 'relative' }}
                type={type ? 'info' : 'success'}
                title={title || 'Successful!'}
                show={showAlert}
                onConfirm={() => (from === 'fund' ? setShowBvnField(true) : onClickSuccess(setshowAlert, goHome))}
                onCancel={() => setshowAlert(false)}
                customButtons={
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: from === 'dashboard' ? 'end' : 'center'
                        }}
                    >
                        <Button
                            sx={{ backgroundColor: '#83529f', color: 'white', mr: 1, '&:hover': { backgroundColor: '#83529f' } }}
                            onClick={() => (from === 'fund' ? setShowBvnField(true) : onClickSuccess(setshowAlert, goHome))}
                            variant="contained"
                            disabled={loading}
                        >
                            {from === 'fund' ? 'Generate now' : 'Ok'}
                        </Button>
                    </div>
                }
            >
                <br />
                <Typography variant="subtitle1" sx={{ textAlign: 'justify' }}>
                    {message}
                </Typography>
                {purchasePin && <Typography variant="subtitle1">{purchasePin}</Typography>}
                {showBvnField && (
                    <div>
                        <Typography variant="subtitle1" sx={{ textAlign: 'justify', marginBottom: '10px' }}>
                            To update your virtual account as required by CBN provide your BVN.
                        </Typography>
                        <TextField
                            label="Enter BVN"
                            variant="outlined"
                            fullWidth
                            value={bvn}
                            onChange={(e) => setBvn(e.target.value)}
                            sx={{ marginBottom: '10px' }}
                        />
                        <Button
                            sx={{ backgroundColor: '#83529f', color: 'white', '&:hover': { backgroundColor: '#83529f' } }}
                            onClick={handleBvnSubmit}
                            variant="contained"
                        >
                            Submit BVN
                        </Button>
                    </div>
                )}
            </SweetAlert>
        );
    };

    const FailureAlert = ({ message }) => {
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
                    <>
                        <Button
                            sx={{ mr: 2, backgroundColor: '#83529f', color: 'white', '&:hover': { backgroundColor: '#83529f' } }}
                            onClick={onClickFailure}
                            variant="contained"
                        >
                            Ok
                        </Button>
                    </>
                }
            >
                {message}
            </SweetAlert>
        );
    };

    if (showAlert) {
        return <SuccessFullAlert title={title} message={message} from={from} />;
    } else if (showErrorAlert) {
        return <FailureAlert message={message} />;
    } else {
        return '';
    }
};

export default FeedBack;
