const User = require ('../../../model/user');
const AccountFunding = require('../../../src/api/funding-models/funding-model');
const fundWallet = require('../../utils/monnify/fundWallet');
const generateRef = require('../../utils/monnify/generateRef');
const getToken = require('../../utils/monnify/getToken');
const createReservedAccount = require("../../utils/monnify/createReservedAccount");

module.exports =  {
  generateMonnifyAccount: async (req, res) => {
    const user = await User.findOne(req.user);
    try {
      const monifyToken = await getToken();
      const monnifyRes = await createReservedAccount({
        token: monifyToken,
        userData: user,
      });

      if (monnifyRes?.requestSuccessful) {
        const newData = monnifyRes?.responseBody?.accounts.map((account) => {
          return {
            bank_name: account.bankName,
            account_number: account.accountNumber,
            account_name: account.accountName,
          };
        });

        await User.findByIdAndUpdate(user._id, {
         
            monnify_bank_details: [...newData],
            hasAccountNum: true,
         
        });

        return res.status(201).json({data:{ message: 'Account created successfully' }});
      } else {
      return res.status(400).json({ data: {message: 'Account creation failed'} });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({data:{ message: 'Internal server error' }});
    }
  },

  deposit: async (req, res) => {
    try {
      console.log('ROUTE HIT');
      const amount = req.body.data.amount;
      const gateway = req.body.data.gateway;
      const user = req.user;
      
      const Fref = `FLW||${generateRef()}`;
      const Cref = `CREDO||${generateRef()}`;
      const Mnfy = `MFY||${generateRef()}`;
      const amountToNumber = Number(amount);
      const amounWithcharges = amountToNumber + (amountToNumber / 100) * 1.65;

      // ... Rest of the existing code
      console.log("amounWithcharges", amounWithcharges.toFixed(2));
      const newFunding = {
        TRX_Name: 'Wallet Funding',
        tx_ref: gateway === 'fwave' ? Fref : gateway === 'monify' ? Mnfy : Cref,
        amount:  amounWithcharges.toFixed(2),
        customer: user.email,
        previous_balance: user.AccountBalance,
        current_balance: user.AccountBalance,
        user: user._id,
      };

      const createdFunding = await AccountFunding.create(newFunding);

      if (gateway === 'fwave') {
        // Fund wallet using Flutterwave
        const flutterwaveRes = await fundWallet({
          gateway,
          userData: user,
          amount,
          ref: Fref,
        });

        console.log(flutterwaveRes);

        if (flutterwaveRes.status === 'success') {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Success',
            transaction_id: flutterwaveRes.transaction_id, // Update with actual field name
          });

          // Send success response
          return res.status(200).json({data:{
            message: 'success',
            response: flutterwaveRes}
          });
        } else {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Failed',
          });

          return res.status(403).json({data:{
            message: 'Service temporarily unavailable'}});
        }
      } else if (gateway === 'monify') {
        // Fund wallet using Monnify
        const monnifyRes = await fundWallet({
          gateway,
          userData: user,
          amount: amounWithcharges.toFixed(2),
          ref: Mnfy,
        });

        console.log(monnifyRes);

        if (monnifyRes.requestSuccessful) {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Success',
            transaction_id: monnifyRes.transactionReference, // Update with actual field name
          });

          // Send success response
          return res.status(200).json({data:{
            message: 'success',
            response: monnifyRes}
          });
        } else {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Failed',
          });
          return res.status(403).json({data:{
            message: 'Service temporarily unavailable'}});
        }
      } else {
        // Fund wallet using another gateway
        const otherGatewayRes = await fundWallet({
          gateway,
          userData: user,
          amount: amount * 100,
          ref: Cref,
        });

        console.log(otherGatewayRes);

        if (otherGatewayRes.status === 200) {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Success',
            transaction_id: otherGatewayRes.transaction_id, // Update with actual field name
          });

          // Send success response
          return res.status(200).json({data:{
            message: 'success',
            response: otherGatewayRes}
          });
        } else {
          // Update the account funding status in MongoDB
          await AccountFunding.findByIdAndUpdate(createdFunding._id, {
            status: 'Failed',
          });
          return res.status(403).json({data:{
            message: 'Service temporarily unavailable'}});
        }
      }

      // ... Rest of the existing code
    } catch (error) {
      console.error(error);
      return res.status(500).json({data:{ message: 'Internal server error' }});
    }
  },
};
