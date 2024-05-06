import mtnLogo from '../assets/images/network/mtn-logo.png';
import gloLogo from '../assets/images/network/glo-log.png';
import airtelLogo from '../assets/images/network/airtel-logo.png';
import data from '../assets/images/data4.svg';
import airtime from '../assets/images/airtime.svg';
import tv from '../assets/images/tv.svg';
import education from '../assets/images/education.svg';
import convert from '../assets/images/convert.svg';
import elect from '../assets/images/electric.svg';
import transaction from '../assets/images/transaction.svg';
import wallet from '../assets/images/wallet.svg';
//import etisalat from '../assets/images/network/9mobile-logo.jpg';
//  <NetworkCheckIcon style={{ color: 'blue', fontSize: '35px' }} />, <NetworkCheckIcon style={{ color: 'blue', fontSize: '35px' }} />,
export const products = [
    {
        id: 1,
        name: 'Buy Airtime',
        image: airtime,
        url: '/buy-airtime'
    },
    {
        id: 2,
        name: 'Data Bundle',
        image: data,
        url: '/buy-data'
    },
    {
        id: 3,
        name: 'Electricity Bills',
        image: elect,
        url: '/electricity-sub'
    },
    {
        id: 4,
        name: 'Cable Sub',
        image: tv,
        url: '/cable-tv-sub'
    },
    {
        id: 5,
        name: 'WAEC/NECO Pin',
        image: education,
        url: '/exam-pin'
    },
    {
        id: 6,
        name: 'Airtime To Cash ',
        image: convert,
        url: '/sell-airtime'
    },
    {
        id: 7,
        name: 'Fund Wallet ',
        image: wallet,
        url: '/fund-wallet'
    },
    {
        id: 8,
        name: 'Trans. History ',
        image: transaction,
        url: '/trx-histories'
    }
];

export const dataProducts = [
    {
        id: 2,
        name: 'MTN CORPORATE',
        image: mtnLogo,
        url: '/buy-mtn-corporate-gifting'
    },
    {
        id: 3,
        name: 'MTN SME DATA',
        image: mtnLogo,
        url: '/buy-mtn-data-sme-2'
    },
    {
        id: 4,
        name: 'MTN COUPON Data',
        image: mtnLogo,
        url: '/buy-mtn-data-coup'
    },

    {
        id: 5,
        name: 'Glo Data',
        image: gloLogo,
        url: '/buy-glo-data'
    },
    {
        id: 6,
        name: 'Glo Corporate ',
        image: gloLogo,
        url: '/buy-glo-cg-data'
    },
    {
        id: 7,
        name: 'Airtel Data',
        image: airtelLogo,
        url: '/buy-airtel-data'
    },
    {
        id: 8,
        name: 'Airtel Corporate',
        image: airtelLogo,
        url: '/buy-airtel-cg-data'
    }
];

export const airtimeProducts = [
    {
        id: 1,
        name: 'MTN Airtime',
        image: mtnLogo,
        url: '/buy-mtn-airtime'
    },
    {
        id: 2,
        name: 'Glo Airtime',
        image: gloLogo,
        url: '/buy-glo-airtime'
    },
    {
        id: 3,
        name: 'Airtel Airtime',
        image: airtelLogo,
        url: '/buy-airtel-airtime'
    }
];
