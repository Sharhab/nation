// material-ui
// project imports
import { Typography } from '@mui/material';
import MainCard from '../../ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Contact = ({ title }) => {
    return (
        <MainCard title={'Contact US'}>
            <Typography
                sx={{
                    marginBottom: '20px'
                }}
                variant="h3"
            >
                Send us a message via any of our customer support channel
            </Typography>
            <ul>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://wa.me/+2347065602624"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4">Whatsaap or Call</Typography>
                    </a>
                </li>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        href="tel: +2347065602624"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4">+2347065602624</Typography>
                    </a>
                </li>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        href="tel: +23465602624"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4">+2347065602624 </Typography>
                    </a>
                </li>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        href="mailto:muktarsharhadev@gmail.com"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4">muktarsharhadev@gmail.com</Typography>
                    </a>
                </li>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        href="https://chat.whatsapp.com/I1W2va6Zt26BDizKm98Ddu"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4">Join sharhapay Reseller's whatsapp Group</Typography>
                    </a>
                </li>
                <li
                    style={{
                        marginBottom: '10px'
                    }}
                >
                    <a
                        href="https://chat.whatsapp.com/COXwAY0D4MSAV6sa17MOqP"
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Typography variant="h4"> Sharhapay Website Update</Typography>
                    </a>
                </li>
            </ul>
        </MainCard>
    );
};

export default Contact;
