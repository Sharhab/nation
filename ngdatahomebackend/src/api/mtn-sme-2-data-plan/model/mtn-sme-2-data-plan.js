const mongoose = require('mongoose');

const mtnSme2DataPlanSchema = new mongoose.Schema({
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

const MTNsme2DataPlan = mongoose.model('MTNsme2DataPlan', mtnSme2DataPlanSchema);

module.exports = MTNsme2DataPlan;



// MTNsme2DataPlan.insertMany([
//   { network: "MTN", plan: "SME2`", bundle: "500.0 MB", plan_id: 306, network_id: 1, price: 256, expiry_date: "14 days" },
//   { network: "MTN", plan: "SME2`", bundle: "1.0 MB", plan_id: 319, network_id: 1, price: 256, expiry_date: "14 days" },
//   { network: "MTN", plan: "SME2", bundle: "1.5 GB ", plan_id: 314, network_id: 1, price: 390, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "2.0 GB ", plan_id: 318, network_id: 1, price: 520, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "3.0 GB ", plan_id: 317, network_id: 1, price: 780, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "4.0 GB ", plan_id: 320, network_id: 1, price: 780, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "5.0 GB ", plan_id:316 , network_id: 1, price: 780, expiry_date: "1 month" },

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

// MTNsme2DataPlan.insertMany([
//   { network: "MTN", plan: "SME2`", bundle: "1.0 MB", plan_id: 319, network_id: 1, price: 260, expiry_date: "14 days" },
//   { network: "MTN", plan: "SME2`", bundle: "500.0 MB", plan_id: 306, network_id: 1, price: 260, expiry_date: "14 days" },
//   { network: "MTN", plan: "SME2", bundle: "1.5 GB", plan_id: 314, network_id: 1, price: 390, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "2.0 GB ", plan_id: 318, network_id: 1, price: 520, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "3.0 GB ", plan_id:317 , network_id: 1, price: 780, expiry_date: "1 month" },
//   { network: "MTN", plan: "SME2", bundle: "4.0 GB ", plan_id:320, network_id: 1, price: 780, expiry_date: "1 month" },

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