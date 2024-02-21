const mongoose = require('mongoose');
// Connect to your MongoDB database
const airtelDataPlanSchema = new mongoose.Schema({
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
// Create a model based on the Airtel CG data plan schema
const AirtelDataPlan = mongoose.model('AirtelDataPlan', airtelDataPlanSchema);
module.exports = AirtelDataPlan

// AirtelDataPlan.insertMany([
//   { network: "AIRTEL", plan: "GIFTING", bundle: "750.0 MB - 14 DAYS", plan_id: 149, network_id: 4, price: 550, expiry_date: "14 days" },
//   { network: "AIRTEL", plan: "GIFTING", bundle: "1.5 GB - 1 month", plan_id: 145, network_id: 4, price: 950.0, expiry_date: "1 month" },
//   { network: "AIRTEL", plan: "GIFTING", bundle: "2.0 GB - 1 month", plan_id: 146, network_id: 4, price: 1120.0, expiry_date: "1 month" },
//   { network: "AIRTEL", plan: "GIFTING", bundle: "3.0 GB - 1 month", plan_id: 147, network_id: 4, price: 1400.0, expiry_date: "1 month" },
//   { network: "AIRTEL", plan: "GIFTING", bundle: "4.5 GB - 1 month", plan_id: 148	, network_id: 4, price:1850.0, expiry_date: "1 month" },

// ])
//   .then(() => {
//     console.log('Data inserted successfully');
//   })
//   .catch((error) => {
//     console.error('Error inserting data:', error);
//   })
//   .finally(() => {
//     // Close the connection after insertion (optional)
//     mongoose.connection.close();
//   });
