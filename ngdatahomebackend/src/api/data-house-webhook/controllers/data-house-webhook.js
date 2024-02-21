const DataHouseWebhook = require("../model/data-house");

export const datahouse = async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);

  const newOrder = {
    network: reqBody.network,
    mobile_number: reqBody.mobile_number,
    status: reqBody.Status,
    balance_before: reqBody.balance_before,
    balance_after: reqBody.balance_after,
    plan_amount: reqBody.plan_amount,
    ident: reqBody.ident,
    api_response: reqBody.api_response,
    refund: reqBody.refund,
  };

  try {
    await DataHouseWebhook.create(newOrder);

    if (reqBody.Status === 'successful') {
      await DataHouseWebhook.updateOne({ ident: reqBody.ident }, { status: 'delivered' });
      return res.status(201).json({ message: 'success' });
    } else {
      await DataHouseWebhook.updateOne({ ident: reqBody.ident }, { status: 'failed' });
      return res.status(201).json({ message: 'success' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'something went wrong, try again' });
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
