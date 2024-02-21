const express = require('express');
const connectDB  = require('./db.js');
// const authRoutes = require('./routes/authRoutes.js');
const router = require('./routes/authRoutes.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

connectDB();

// app.use('/api', authRoutes);
app.use('/api', router);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
