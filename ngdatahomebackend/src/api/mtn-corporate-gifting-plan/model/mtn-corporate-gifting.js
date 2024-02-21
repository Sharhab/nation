const mongoose = require('mongoose');

const mtnCorporateDataPlanSchema = new mongoose.Schema({
  network: {
    type: String,
    required: true
  },
  plan: {
    type: String,
    required: true
  },
  bundle: {
    type: String,
    required: true
  },
  plan_id: {
    type: Number,
    required: true
  },
  network_id: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  expiry_date: {
    type: String,
    required: true
  }
});

const MTNcorporate = mongoose.model('MTNcorporate', mtnCorporateDataPlanSchema);

module.exports = MTNcorporate;



// MTNcorporate.insertMany([
//   { network: "MTN", plan: "	CORPORATE GIFTING`", bundle: "500.0 MB", plan_id: 232, network_id: 1, price: 256, expiry_date: "14 days" },
//   { network: "MTN", plan: "	CORPORATE GIFTING`", bundle: "1.0 MB", plan_id: 213, network_id: 1, price: 256, expiry_date: "14 days" },
//   { network: "MTN", plan: "	CORPORATE GIFTING", bundle: "2.0 GB ", plan_id: 214, network_id: 1, price: 520, expiry_date: "1 month" },
//   { network: "MTN", plan: "	CORPORATE GIFTING", bundle: "3.0 GB ", plan_id: 233, network_id: 1, price: 780, expiry_date: "1 month" },
//   { network: "MTN", plan: "	CORPORATE GIFTING", bundle: "5.0 GB ", plan_id:216, network_id: 1, price: 780, expiry_date: "1 month" },
// ])
//   .then(() => {
//     console.log('Data inserted successfully');
//   })
//   .catch((error) => {
//     console.error('Error inserting data:', error);
//   })
//   .finally(() => {
//     // Close the connection after insertion (optional)
//      mongoose.connection.close();
//   });

