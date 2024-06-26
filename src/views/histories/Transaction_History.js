// material-ui
// project imports
import { Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getHistories, userAction } from '../../store/actions';
import MainCard from '../../ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Histories = () => {
    const { transactionHistory, login } = useSelector((state) => state);
    const { loading, histories } = transactionHistory;
   console.log(histories);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!login.isLoggedIn){ 
      navigate('/pages/login');
        }
        dispatch(userAction({ navigate }));
        dispatch(getHistories({ enqueueSnackbar }));
    }, [dispatch, enqueueSnackbar, navigate]);

    const columns = [
        {
            name: 'name',
            label: 'Transaction Name',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                sort: false
            }
        },

        {
            name: 'date',
            label: 'Date',
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: 'amount',
            label: 'Amount',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'plan',
            label: 'Plan',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'previous_balance',
            label: 'Previous Balance',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'current_balance',
            label: 'Current Balance',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'beneficiary',
            label: 'Beneficiary',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'network',
            label: 'Network',
            options: {
                filter: true,
                sort: false
            }
        },

        {
            name: 'exam_pin',
            label: 'Serial No / Pin',
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: 'electricity',
            label: 'Token',
            options: {
                filter: true,
                sort: false
            }
        },

        {
            name: 'ref',
            label: 'Refrence',
            options: {
                filter: true,
                sort: false
            }
        }
    ];
    histories?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const data = histories?.map((serv, i) => {
        // const strDate = new Date(serv?.createdAt);
        const formattedDate = moment(serv?.createdAt).format('LLLL');
        // function convert(strDate) {
        
        return {
            id: `${serv._id}`,
            name: `${serv.TRX_Name ? serv?.TRX_Name : serv?.plan || '-'}`,
            ref: `${serv.request_id || serv?.ref || serv?.tx_ref || serv?.request_Id || '-'}`,
            amount: `${serv.amount}`,
            previous_balance: `${serv?.previous_balance}`,
            current_balance: `${serv?.current_balance}`,
            network: `${serv.network ? serv.network : '-'}`,
            beneficiary: `${serv.beneficiary ? serv?.beneficiary : serv?.phone_number || serv?.phone || '-'}`,
            status: `${serv.status}`,
            exam_pin: `${serv.purchased_pin || '-'}`,
            electricity: `${serv.purchased_token || '-'}`,
            date: formattedDate,
            plan: `${serv?.plan || serv?.Plan || '-'}`
        };
    });

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none'
        // sortOrder: {
        //     name: 'date',
        //     direction: 'desc'
        // }
    };
    return (
        <MainCard title={'Transactions History'}>
            {loading ? (
                <Box sx={{ textAlign: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <MUIDataTable title={'Histories'} data={data} columns={columns} options={options} />
            )}
        </MainCard>
    );
};

export default Histories;
