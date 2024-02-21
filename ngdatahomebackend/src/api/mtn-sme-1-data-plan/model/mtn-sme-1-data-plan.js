const mongoose = require('mongoose');

const mtnSme1DataPlanSchema = new mongoose.Schema({
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

const MTNsme1DataPlan = mongoose.model('MTNsme1DataPlan', mtnSme1DataPlanSchema);

module.exports = MTNsme1DataPlan;



// MTNsme1DataPlan.insertMany([
//   { network: "MTN", plan: "SME1`", bundle: "1.0 MB - 30 DAYS", plan_id: 5, network_id: 1, price: 260, expiry_date: "14 days" },
//   { network: "MTN", plan: "SME1", bundle: "1.5 GB - 1 month", plan_id: 6, network_id: 1, price: 390, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME1", bundle: "2.0 GB - 1 month", plan_id: 7, network_id: 1, price: 520, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME1", bundle: "3.0 GB - 1 month", plan_id: 8, network_id: 1, price: 780, expiry_date: "1 month" },

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