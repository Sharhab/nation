const randomString = require('randomstring');
const customNetwork = require('../../../utils/customNetwork');
const bcrypt = require("bcryptjs");
const MTNsme1DataPlan = require('../../mtn-sme-1-data-plan/model/mtn-sme-1-data-plan');
const User = require('../../../../model/user');
// Assuming you have a MongoDB connection
const MtnSme1DataOrder = async (req, res) => {
  const { data } = req.body;

  const user = await User.findOne({id: req.user._id}); // Implement this function to get the user by ID

  if (user.AccountBalance < Number(data.amount)) {
    return res.status(400).json({data: {message: 'Low Wallet Balance, please fund your wallet'}});
  }

  const validPin = bcrypt.compare(data.pin, user.pin); // Implement this function to validate password
  if (!validPin) {
    return res.status(400).json({data:{message: 'Incorrect Pin'}});
  }


  user.PreviousBalance = user.AccountBalance;
  user.AccountBalance -= Number(data.amount);
  await user.save();

  const ref = `DATAHOUSE|SME1|${randomString.generate(8)}`;
  const dataBasePayload = {
    user,
    ref: ref,
    beneficiary: data.beneficiary,
    network: data.network,
    plan: data.plan.Plan,
    amount: data.amount,
    AccountBalance: user.AccountBalance,
    PreviouseBlance: user.AccountBalance,
  };

  try {
    // Create a new order document in MongoDB
     await MTNsme1DataPlan.create(dataBasePayload);

    // Update the user's balance

    // Make a custom network request
    const payload = {
      network_id: '1',
      plan_id: `${data.plan.plan_id}`,
      phone: data.beneficiary,
      size: data.plan
    };

    const response = await customNetwork({
      method: 'POST',
      target: 'arrahuz',
      path: '/',
      requestBody: payload,
      headers: { Authorization: `Token ${process.env.DATAHOUSE_TOKEN}` },
    });

    // Handle the response based on your requirements
    if (response.data.Status === 'successful') {

    await MTNsme1DataPlan.findOneAndUpdate(
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
};

module.exports = MtnSme1DataOrder
// Implement the necessary functions for user and order operations

