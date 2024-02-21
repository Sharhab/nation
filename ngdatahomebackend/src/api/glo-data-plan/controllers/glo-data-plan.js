const Glo1DataPlan = require('../model/glo-data-plan');

module.exports = {
  findglodata: async (_req, res) => {
    try {
      const data = await Glo1DataPlan.find();
      if (!data || data.length === 0) {
        res.status(404).json({ message: 'no data' });
      } else {
        console.log(data);
  
        // Assuming data is an array, you might want to handle each element
        const responseData = 
        data.map(({ network, network_id, plan, plan_id, price, bundle, expiry_date }) => ({
          network,
          network_id,
          plan,
          plan_id,
          price,
          bundle,
          expiry_date,
        }));
  
        res.status(200).json({ data: responseData });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
      console.log(error.message);
    }
  },
  
  findglodataOne: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Glo1DataPlan.findById(id);
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createglodata: async (req, res) => {
    try {
      const data = await Glo1DataPlan.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateglodata: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Glo1DataPlan.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteglodata: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await Glo1DataPlan.findByIdAndDelete(id);
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
