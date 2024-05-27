import { useState } from 'react';
import { Button, Typography, TextField, Box } from '@mui/material';
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
    const [showBvnInput, setShowBvnInput] = useState(false);

    const onClickSuccess = (setshowAlert, goHome) => {
        setshowAlert((prevAlert) => !prevAlert);
        if (goHome) {
            navigate('/');
        }
    };

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { monnifyAccountGeneration } = useSelector((state) => state);
    const { loading } = monnifyAccountGeneration;

    const generateAccount = async () => {
        await dispatch(generateMonnifyAccount({ bvn, enqueueSnackbar, navigate }));
        setshowAlert((prevAlert) => !prevAlert);
    };

    const onClickFailure = () => {
        setshowErrorAlert(false);
    };

    const handleBvnChange = (e) => {
        setBvn(e.target.value);
    };

    const SuccessFullAlert = ({ title, message, from }) => {
        return (
            <SweetAlert
                style={{ width: '500px', position: 'relative' }}
                type={type ? 'info' : 'success'}
                title={title || 'Successful!'}
                show={showAlert}
                onConfirm={() => (from === 'fund' ? setShowBvnInput(true) : onClickSuccess(setshowAlert, goHome))}
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
                            onClick={() => (from === 'fund' ? setShowBvnInput(true) : onClickSuccess(setshowAlert, goHome))}
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
                {showBvnInput && (
                    <Box mt={2}>
                        <Typography variant="h6" gutterBottom>
                            To Update Your Virtual Account Number as Required By CBN Provide Your BVN and This will help to enhance privacy and Secure your Account.
                        </Typography>
                        <TextField
                            label="BVN"
                            variant="outlined"
                            fullWidth
                            value={bvn}
                            onChange={handleBvnChange}
                            disabled={loading}
                        />
                        <Button
                            sx={{ mt: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={generateAccount}
                            disabled={loading || !bvn}
                        >
                            Submit
                        </Button>
                    </Box>
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
                            sx={{ mr: 2, backgroundColor: '#83529f', color: 'white', mr: 1, '&:hover': { backgroundColor: '#83529f' } }}
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
        return null;
    }
};

export default FeedBack;
