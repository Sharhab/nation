const MtnDataPlan = require('../model/mtn-data-model');

module.exports = {
  findmtndata: async (_req, res) => {
    try {
      const data = await MtnDataPlan.find();
      if (!data || data.length === 0) {
        res.status(404).json({ message: 'no data' });
      } else {
        console.log(data);
  
        // Assuming data is an array, you might want to handle each element
        const responseData = 
        data.map(({ network, network_id, plan, plan_id, price, bundle, expiry_date,_id}) => ({
          network,
          network_id,
          plan,
          plan_id,
          price,
          bundle,
          expiry_date,
          _id
        }));
  
        res.status(200).json({ data: responseData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error.message);
    }
  },
  
  findmtndataOne: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MtnDataPlan.findById(id);
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createmtndata: async (req, res) => {
    try {
      const data = await MtnDataPlan.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatemtndata: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MtnDataPlan.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletemtndata: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MtnDataPlan.findByIdAndDelete(id);
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
