// const randomString = require( "randomstring");
// const axios = require("axios");
const User = require('../../../../model/user'); // Ensure this path is correct
const customNetwork = require('../../../utils/customNetwork');
const  MtnSmetwoData = require('../../mtn-sme-2-data-order/model/mtn-sme-2-data-order');
const SmeDataOrder = require('../../sme-data-order/model/sme-data-order')
const CGDataOrder = require('../model/airtel-order-model');
const GloCgDataOrder = require('../../glo-cg-data-order/model/glo-cg-data-order')
const GloDataOrder = require('../../glo-data-order/model/glo-data-order')
const AirtelDataOrder = require('../../airtel-data-order/model/airtel-order-model')
const MtnCorporateDataOrder = require('../../mtn-corporate-gifting-order/model/mtn-corporate-gifting-order')
const MtnCooponDataOrder = require('../../mtn-coopon-data-order/model/mtn-coopon-data-order')
const bcrypt = require("bcryptjs");
const SellAirtime = require('../../mtn-airtime-order/model/mtn-airtime-plan');

const orderController = {
  createOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new CGDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        request_Id:data.request_Id,
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response)
      if (response.data.Status === 'successful') {
        await CGDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createcouponOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new MtnCooponDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  MtnCooponDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createAirtelOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new AirtelDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  AirtelDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createSme2Order: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new MtnSmetwoData({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  MtnSmetwoData.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createSmeOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new SmeDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  SmeDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createmtnCgOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new MtnCorporateDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await MtnCorporateDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createCooponOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new MtnSmetwoData({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  MtnSmetwoData.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createGloOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new GloDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  GloDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  createGloCgOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new GloCgDataOrder({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network_id, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        mobile_number: data.beneficiary, // Assuming data.phone contains the mobile number
        plan: data.plan_id, // Assuming data.plan_id contains the plan identifier
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      
      const response = await customNetwork({
        method: "post",
        target: "arrahuz",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  GloCgDataOrder.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: `SdataPlus Successful gifted ${data.plan} to ${data.beneficiary}`,
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  },
  mtnAirtimeOrder: async (req, res) => {
    try {
      const data = req.body.data;
      const user = await User.findById(req.user._id);
      console.log(data)
      // Validate User's Account Balance
      if (user.AccountBalance < Number(data.amount)) {
        return res.status(400).json({
          data: { 
            message: "Your account balance is insufficient. Please fund your wallet."
          }
        });
      }

      // Validate Beneficiary Number Format
      if (!isValidBeneficiaryNumberFormat(data.beneficiary)) {
        return res.status(400).json({
          data: {
            message: "Invalid beneficiary number format. Please use the format: 08011111111"
          }
        });
      }

      // Validate PIN
      const validPin =  bcrypt.compare(data.pin, user.pin);
      if (!validPin) {
        return res.status(400).json({
          data: { 
            message: "Incorrect Pin" 
          }
        });
      }

   
      // Save the current balance as previousBalance
      user.PreviousBalance = user.AccountBalance;
      user.AccountBalance -= Number(data.amount);
      await user.save();

      // Create New Order
      const { pin, ...restOfData } = data;
      const newOrder = new SellAirtime({
        ...restOfData,
        user: req.user._id
      });

      await newOrder.save();
      const payload = JSON.stringify({
        network: data.network, // Assuming data.network_id contains the network identifier
        network_id: data.network_id,
        amount: data.amount,
        phone_number: data.beneficiary,
        plan_id: data.plan_id,   
        Ported_number: true // If you need to specify whether the number is ported
      });
      
      console.log(payload)
      const response = await customNetwork({
        method: "post",
        target: "arrahuzair",
        path: "/", // Ensure this path is correct as per API documentation
        requestBody: payload,
        headers: {
          Authorization: `Token ${process.env.ARRAHUZ_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      

      console.log(response);
      if (response.data.Status === 'successful') {
        await  SellAirtime.findOneAndUpdate(
          { request_Id: data.request_Id },
          {
            status: "delivered",
            ident: response.data.ident,
          }
        );

        res.status(200).json({
          data: {
            message: 'Sucessful',
            
          }
        });
      } else {
        // Rollback in case of failure
        user.AccountBalance = user.PreviousBalance;
        await user.save();
        const errorMessage = response.data.error
          ? response.data.error.join(', ')
          : response.data.api_response || "Purchase not successful";
      
        throw new Error(errorMessage);
      }
      
    } catch (error) {
      console.error("Error in createOrder:", error.message);
      // Roll back the user's account balance to its previous state
      const user = await User.findById(req.user._id);
      user.AccountBalance = user.PreviousBalance;
      await user.save();

      return res.status(500).json({
        data: {
          message: "Purchase failed. Please try again.",
        }
      });
    }
  }
};

module.exports = orderController;

async function isValidBeneficiaryNumberFormat (number) {
  const numberPattern = /^\d{11}$/;
  return numberPattern.test(number);
}


