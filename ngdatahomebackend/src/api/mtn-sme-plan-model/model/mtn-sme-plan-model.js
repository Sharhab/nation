const mongoose = require('mongoose');
// Connect to your MongoDB database
// Define the schema for the Airtel CG data plans
const MtnsmeDataPlanSchema = new mongoose.Schema({
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
const MtnsmeDataPlan = mongoose.model('MtnsmeDataPlan', MtnsmeDataPlanSchema );
module.exports = MtnsmeDataPlan

// MtnsmeDataPlan.insertMany([
//   { network: "MTN", plan: "sme", bundle: "1.0 MB - 30 DAYS", plan_id: 7, network_id: 1, price: 256.0, expiry_date: "14 days" },
//   { network: "MTN", plan: "sme", bundle: "5.0 GB - 1 month", plan_id: 11, network_id: 1, price: 1280.0, expiry_date: "1 month" },
//   { network: "MTN", plan: "sme", bundle: "2.0 GB - 1 month", plan_id: 8, network_id: 1, price: 512.0, expiry_date: "1 month" },
//   { network: "MTN", plan: "sme", bundle: "3.0 GB - 1 month", plan_id: 44, network_id: 1, price: 768.0, expiry_date: "1 month" },

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
