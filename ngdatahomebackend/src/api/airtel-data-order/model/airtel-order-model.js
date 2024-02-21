const mongoose = require('mongoose');

const airtelDataOrderSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true
  },
  network_id: {
    type: Number,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  plan_id: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  request_Id: {
    type: String,
    required: true
  },
  ident: {
    type: String,
    required: false
  },
  previous_balance: {
    type: mongoose.Decimal128
  },
  current_balance: {
    type: mongoose.Decimal128
  },
  beneficiary: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'failed', 'qeued'],
    default: 'pending'
  },
  TRX_Name: {
    type: String,
    required: true,
    default: 'Corporate Gifting (CG)'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const AirtelDataOrder = mongoose.model('AirtelDataOrder', airtelDataOrderSchema);

module.exports = AirtelDataOrder;
