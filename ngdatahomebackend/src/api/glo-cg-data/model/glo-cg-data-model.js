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
const GloDataPlan = mongoose.model('GloDataPlan', GloDataPlanSchema );
module.exports = GloDataPlan


// GloDataPlan.insertMany([
//   { network: "GLO", plan: "GLO CORPORA GIFTING", bundle: "1.0 MB - 30 DAYS", plan_id: 285, network_id: 2, price: 250, expiry_date: "14 days" },
//   { network: "GLO", plan: "GLO CORPORA GIFTING", bundle: "500.0 MB " - 1 month", plan_id: 290, network_id: 2, price: 125, expiry_date: "1 month" },
//   { network: "GLO", plan: "GLO CORPORA GIFTING", bundle: "2.0 GB - 1 month", plan_id: 286, network_id: 2, price: 500, expiry_date: "1 month" },
//   { network: "GLO", plan:"GLO CORPORAT GIFTING", bundle: "3.0 GB - 1 month", plan_id: 287, network_id: 2, price: 750, expiry_date: "1 month" },
//   { network: "GLO", plan:"GLO CORPORATE GIFTING", bundle: "5.0 GB - 1 month", plan_id: 288, network_id: 2, price: 1250, expiry_date: "1 month" },

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
