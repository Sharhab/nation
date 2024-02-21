const mongoose = require('mongoose');
// Connect to your MongoDB database
// Define the schema for the Airtel CG data plans
const MtncouponDataPlanSchema = new mongoose.Schema({
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
const MtncouponDataPlan = mongoose.model('MtncouponDataPlan', MtncouponDataPlanSchema );
module.exports = MtncouponDataPlan

// MtncouponDataPlan.insertMany([
//   { network: "MTN", plan: "coupon", bundle: "750 MB ", plan_id: 322, network_id: 1, price: 150, expiry_date: "14 days" },
//   { network: "MTN", plan: "coupon", bundle: "1.0 GB ", plan_id: 324, network_id: 1, price: 330, expiry_date: "14 days" },
//   { network: "MTN", plan: "coupon", bundle: "1.5 GB ", plan_id: 323, network_id: 1, price: 475,expiry_date: "1 month" },
//   { network: "MTN", plan: "coupon", bundle: "2.0 GB ", plan_id: 325, network_id: 1, price: 660, expiry_date: "1 month" },
//   { network: "MTN", plan: "coupon", bundle: "3.0 GB ", plan_id: 326, network_id: 1, price: 990, expiry_date: "1 month" },

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
