const mongoose = require('mongoose');
// Connect to your MongoDB database
// Define the schema for the Airtel CG data plans
const GloDataPlanSchema = new mongoose.Schema({
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
const Glo1DataPlan = mongoose.model('Glo1DataPlan', GloDataPlanSchema );
module.exports = Glo1DataPlan

// Glo1DataPlan.insertMany([
//   { network: "GLO", plan: "GIFTING", bundle: "1.35 GB - 30 DAYS", plan_id: 194, network_id: 2, price: 460.0, expiry_date: "14 days" },
//   { network: "GLO", plan: "GIFTING", bundle: "3.9 GB " - 1 month", plan_id:195, network_id: 2, price: 920.0, expiry_date: "1 month" },
//   { network: "GLO", plan: "GIFTING", bundle: "7.5 GB - 1 month", plan_id: 196, network_id: 2, price: 1380.0, expiry_date: "1 month" },
//   { network: "GLO", plan:"GIFTING", bundle: "10.8 GB - 1 month", plan_id: 198, network_id: 2, price: 2300.0, expiry_date: "1 month" },

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
