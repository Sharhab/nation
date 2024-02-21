const mongoose = require('mongoose');

const dataHouseWebhookSchema = new mongoose.Schema({
  mobile_number: {
    type: String,
    required: true
  },
  ident: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  balance_before: {
    type: String,
    required: true
  },
  balance_after: {
    type: String,
    required: true
  },
  plan_amount: {
    type: String,
    required: true
  },
  network: {
    type: Number,
    required: true
  },
  api_response: {
    type: String,
    required: true
  },
  refund: {
    type: Boolean,
    default: false
  }
});

const DataHouseWebhook = mongoose.model('DataHouseWebhook', dataHouseWebhookSchema);

module.exports = DataHouseWebhook;
