// // const randomString = require( "randomstring");
// // const axios = require("axios");
// const User = require('../../../../model/user'); // Ensure this path is correct
// const customNetwork = require('../../../utils/customNetwork');
// const  MtnSmetwoData = require('../model/mtn-sme-2-data-plan');
// const bcrypt = require("bcryptjs");

// const orderController = {
//   createSme2Order: async (req, res) => {
//     try {
//       const data = req.body.data;
//       const user = await User.findById(req.user._id);

//       // Validate User's Account Balance
//       if (user.AccountBalance < Number(data.amount)) {
//         return res.status(400).json({
//           data: { 
//             message: "Your account balance is insufficient. Please fund your wallet."
//           }
//         });
//       }

//       // Validate Beneficiary Number Format
//       if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
//         return res.status(400).json({
//           data: {
//             message: "Invalid beneficiary number format. Please use the format: 08011111111"
//           }
//         });
//       }

//       // Validate PIN
//       const validPin =  bcrypt.compare(data.pin, user.pin);
//       if (!validPin) {
//         return res.status(400).json({
//           data: { 
//             message: "Incorrect Pin" 
//           }
//         });
//       }

//       // Save the current balance as previousBalance
//       user.PreviousBalance = user.AccountBalance;
//       user.AccountBalance -= Number(data.amount);
//       await user.save();

//       // Create New Order
//       const { pin, ...restOfData } = data;
//       const newOrder = new CGDataOrder({
//         ...restOfData,
//         user: req.user._id
//       });

//       await newOrder.save();

//       const payload = JSON.stringify({
//         network: data.network_id, // Assuming data.network_id contains the network identifier
//         mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
//         plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
//         Ported_number: true // If you need to specify whether the number is ported
//       });
      
//       const response = await customNetwork({
//         method: "post",
//         target: "arrahuz",
//         path: "/", // Ensure this path is correct as per API documentation
//         requestBody: payload,
//         headers: {
//           Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
//           "Content-Type": "application/json",
//         },
//       });
      

//       console.log(response)
//       if (response.data.Status === 'successful') {
//         await CGDataOrder.findOneAndUpdate(
//           { request_Id: data.request_Id },
//           {
//             status: "delivered",
//             ident: response.data.ident,
//           }
//         );

//         res.status(200).json({
//           data: {
//             message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
//           }
//         });
//       } else {
//         // Rollback in case of failure
//         user.AccountBalance = user.PreviousBalance;
//         await user.save();
//         const errorMessage = response.data.error
//           ? response.data.error.join(', ')
//           : response.data.api_response || "Purchase not successful";
      
//         throw new Error(errorMessage);
//       }
      
//     } catch (error) {
//       console.error("Error in createOrder:", error.message);
//       // Roll back the user's account balance to its previous state
//       const user = await User.findById(req.user._id);
//       user.AccountBalance = user.PreviousBalance;
//       await user.save();

//       return res.status(500).json({
//         data: {
//           message: "Purchase failed. Please try again.",
//         }
//       });
//     }
//   }
// };

// module.exports = orderController;

// // Function to Validate Beneficiary Number Format
// async function isValidBeneficiaryNumberFormat (number) {
//   // Assuming the format requires 11 digits
//   const numberPattern = /^\d{11}$/;
//   return numberPattern.test(number);
// }



//       // var config = {
//       //   method: 'post',
//       // maxBodyLength: Infinity,
//       //   url: 'https://alrahuzdata.com.ng/api/data/',
//       //   headers: { 
//       //     'Authorization': 'Token 66f2e5c39ac8640f13cd888f161385b12f7e5e92', 
//       //     'Content-Type': 'application/json'
//       //   },
//       //   data : data
//       // };
      
//       // axios(config)
//       // .then(function (response) {
//       //   console.log(JSON.stringify(response.data));
//       // })
//       // .catch(function (error) {
//       //   console.log(error);
//       // });
      







// // const express = require('express');
// // const router = express.Router();
// // const randomString = require('randomstring');
// // const customNetwork = require('../../../utils/customNetwork');

// // // Assuming you have a MongoDB connection
// // const MtnSme2DataOrder = require('./models/mtnSme2DataOrder'); // Define your Mongoose model

// // router.post('/mtn-sme-2-data-orders', async (req, res) => {
// //   const { data } = req.body;

// //   const { id } = req.user; // Assuming user ID is available in req.user
// //   const user = await getUserById(id); // Implement this function to get the user by ID

// //   if (user.AccountBalance < Number(data.amount)) {
// //     return res.status(400).send('Low Wallet Balance, please fund your wallet');
// //   }

// //   const validPin = await validatePassword(data.pin, user.pin); // Implement this function to validate password
// //   if (!validPin) {
// //     return res.status(400).send('Incorrect Pin');
// //   }

// //   const ref = `BELLO|SME2|${randomString.generate(8)}`;
// //   const dataBasePayload = {
// //     user: id,
// //     ref: ref,
// //     beneficiary: data.beneficiary,
// //     network: data.network,
// //     plan: data.plan.Plan,
// //     amount: data.amount,
// //     previous_balance: user.AccountBalance,
// //     current_balance: user.AccountBalance,
// //   };

// //   try {
// //     // Create a new order document in MongoDB
// //     const newOrder = await MtnSme2DataOrder.create(dataBasePayload);

// //     // Update the user's balance
// //     const updatedUser = await updateUserBalance(id, user.AccountBalance - Number(data.amount));

// //     // Make a custom network request
// //     const payload = {
// //       network_id: '1',
// //       plan_id: `${data.plan.plan_id}`,
// //       phone: data.beneficiary,
// //     };

// //     const res = await customNetwork({
// //       method: 'POST',
// //       target: 'bello',
// //       path: 'data',
// //       requestBody: payload,
// //       headers: { Authorization: `Bearer ${process.env.BELLO_SECRET}` },
// //     });

// //     // Handle the response based on your requirements
// //     if (res.status === 200 && res.data.status) {
// //       // Update the order status to "delivered"
// //       await updateOrderStatus(ref, 'delivered', updatedUser.AccountBalance);

// //       return res.json({
// //         message: res.data.api_response || `Successful gifted ${data.plan.Plan} to ${data.beneficiary}`,
// //       });
// //     } else if (!res.data.status) {
// //       // Update the order status to "failed" if the response status is not successful
// //       await updateOrderStatus(data.request_Id, 'failed', updatedUser.AccountBalance);
      
// //       return res.status(400).send(res.data.api_response);
// //     } else {
// //       // Update the order status to "failed" for other errors
// //       await updateOrderStatus(ref, 'failed', user.AccountBalance);
// //       return res.status(500).send('Transaction was not successful');
// //     }
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(500).send('Internal Server Error');
// //   }
// // });

// // // Implement the necessary functions for user and order operations

// // module.exports = router;
