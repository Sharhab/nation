const mongoose = require('mongoose');

const mtnAirtimePlanSchema = new mongoose.Schema({
  network: Number, // Represents the network code (1 for MTN, 2 for GLO, etc.)
  network_name: String, // Optional, if you want to store the name too
  amount: Number, // The airtime amount
  network_amount: Number, // Your provided 'network_amount' field
});

const MtnAirtimePlan = mongoose.model('MtnAirtimePlan', mtnAirtimePlanSchema);

module.exports = MtnAirtimePlan;e


// const airtimePlans = [
//     { network: 1, network_name: "MTN", amount: 200, network_amount: 2 },
//     { network: 1, network_name: "MTN", amount: 500, network_amount: 3 },
//     { network: 2, network_name: "GLO", amount: 100, network_amount: 4 },
//     { network: 2, network_name: "GLO", amount: 200, network_amount: 5 },
//     { network: 2, network_name: "GLO", amount: 500, network_amount: 6 },
//     { network: 3, network_name: "9MOBILE", amount: 100, network_amount: 7 },
//     { network: 3, network_name: "9MOBILE", amount: 200, network_amount: 8 },
//     { network: 4, network_name: "AIRTEL", amount: 100, network_amount: 10 },
//     { network: 4, network_name: "AIRTEL", amount: 200, network_amount: 11 },
//     { network: 4, network_name: "AIRTEL", amount: 500, network_amount: 12 },
//   ];
  
//   MtnAirtimePlan.insertMany(airtimePlans)
//     .then(() => console.log('Data inserted'))
//     .catch(err => console.log(err))
//     .finally(() => mongoose.connection.close());
  