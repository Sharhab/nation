import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../store/actions'; // Ensure the correct import path
import { Box, CircularProgress } from '@mui/material';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import MainCard from '../../ui-component/cards/MainCard'; // Ensure the correct import path

const Histories = () => {
    const { transactionHistory } = useSelector((state) => state);
    const { loading, orders } = transactionHistory;

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const columns = [
        { name: 'name', label: 'Transaction Name', options: { filter: true, sort: true } },
        { name: 'status', label: 'Status', options: { filter: true, sort: false } },
        { name: 'date', label: 'Date', options: { filter: true, sort: true } },
        { name: 'amount', label: 'Amount', options: { filter: true, sort: false } },
        { name: 'plan', label: 'Plan', options: { filter: true, sort: false } },
        { name: 'previous_balance', label: 'Previous Balance', options: { filter: true, sort: false } },
        { name: 'current_balance', label: 'Current Balance', options: { filter: true, sort: false } },
        { name: 'beneficiary', label: 'Beneficiary', options: { filter: true, sort: false } },
        { name: 'network', label: 'Network', options: { filter: true, sort: false } },
        { name: 'exam_pin', label: 'Serial No / Pin', options: { filter: true, sort: false } },
        { name: 'electricity', label: 'Token', options: { filter: true, sort: false } },
        { name: 'ref', label: 'Reference', options: { filter: true, sort: false } }
    ];

    const data = orders.map((order) => {
        const formattedDate = moment(order.createdAt).format('LLLL');

        return {
            id: order._id,
            name: order.TRX_Name || order.plan || '-',
            ref: order.request_id || order.ref || order.tx_ref || order.request_Id || '-',
            amount: order.amount,
            previous_balance: order.previous_balance,
            current_balance: order.current_balance,
            network: order.network || '-',
            beneficiary: order.beneficiary || order.phone_number || order.phone || '-',
            status: order.status,
            exam_pin: order.purchased_pin || '-',
            electricity: order.purchased_token || '-',
            date: formattedDate,
            plan: order.plan || '-'
        };
    });

    const options = {
        filterType: 'checkbox',
        selectableRows: 'none'
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
