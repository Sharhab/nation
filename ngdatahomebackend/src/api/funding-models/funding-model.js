// accountFunding.model.js
const mongoose = require('mongoose');

const accountFundingSchema = new mongoose.Schema({
  TRX_Name: {
    type: String,
    required: true,
  },
  tx_ref: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Success', 'Failed'],
    required: true,
    default: 'Pending',
  },
  previous_balance: {
    type: Number,
  },
  current_balance: {
    type: Number,
  },
  transaction_id: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const AccountFunding  = mongoose.model('AccountFunding', accountFundingSchema);
module.exports = AccountFunding