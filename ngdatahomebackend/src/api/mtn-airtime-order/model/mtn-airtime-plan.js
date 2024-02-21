const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sellAirtimeSchema = new Schema({
  network: { type: String, required: true },
  amount: { type: Number, required: true },
  account_number: String,
  account_name: String,
  bank_name: String,
  phone_number: { type: String},
  request_id: { type: String, required: true, unique: true },
  // Assuming 'user' would be a reference to a User model you have or will create
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  TRX_Name: { type: String, default: "Sell Airtime" },
  status: { 
    type: String, 
    enum: ["Pending", "Sucessful", "Failed"], 
    default: "Pending", 
    required: true 
  },
  // Mongoose does not have a 'media' type, so you might store an image path or URL as a string
  screenshot: String,
  previous_balance:Number,
  current_balance: Number,
}, { timestamps: true });

const SellAirtime = mongoose.model('SellAirtime', sellAirtimeSchema);
module.exports = SellAirtime
