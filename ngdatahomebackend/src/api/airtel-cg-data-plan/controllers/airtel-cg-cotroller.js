const AirtelCGDataPlan = require('../model/airtel-cg-model');

module.exports = {
  find: async (_req, res) => {
    try {
      const data = await AirtelCGDataPlan.find();
      if (!data || data.length === 0) {
        res.status(404).json({ message: 'no data' });
      } else {
      
  
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
  
  findOne: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await AirtelCGDataPlan.findById(id);
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createcgdataplan: async (req, res) => {
    try {
      const data = await AirtelCGDataPlan.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await AirtelCGDataPlan.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletecgdatapalan: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await AirtelCGDataPlan.findByIdAndDelete(id);
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
