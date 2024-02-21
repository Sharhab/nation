const mongoose = require('mongoose');
// Connect to your MongoDB database
// Define the schema for the Airtel CG data plans
const airtelCGDataPlanSchema = new mongoose.Schema({
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
const AirtelCGDataPlan = mongoose.model('AirtelCGDataPlan', airtelCGDataPlanSchema);
module.exports = AirtelCGDataPlan

//  AirtelCGDataPlan.insertMany([
//    { network: "AIRTEL", plan: "CDG", bundle: "500.0 MB", plan_id: 222, network_id:4, price: 120, expiry_date: "1 month" },
//    { network: "AIRTEL", plan: "CDG", bundle: "1.0 GB", plan_id: 223, network_id: 4, price: 240, expiry_date: "30 days" },
//    { network: "AIRTEL", plan: "CDG", bundle: "2.0 GB", plan_id: 224, network_id: 4, price: 480, expiry_date: "30 days" },
//    { network: "AIRTEL", plan: "CDG", bundle: "5.0 GB", plan_id: 225, network_id: 4, price: 1180, expiry_date: "1 month" },
//     ]).then(() => {
//      console.log('Data inserted successfully');
//    })
//    .catch((error) => {
//      console.error('Error inserting data:', error);
//    })
//    .finally(() => {
//      // Close the connection after insertion (optional)
//      mongoose.connection.close();
//   });
