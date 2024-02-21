const MTNcorporate = require('../../mtn-corporate-gifting-plan/model/mtn-corporate-gifting');

module.exports = {
  findcorporate: async (_req, res) => {
    try {
      const data = await MTNcorporate.find();
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
  
  findcorporateOne: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MTNcorporate.findById(id);
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  createcorporate: async (req, res) => {
    try {
      const data = await MTNcorporate.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updatecorporate: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MTNcorporate.findByIdAndUpdate(id, req.body, { new: true });
      if (!data) {
        res.status(404).json({ error: 'Entry not found' });
        return;
      }
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletecorporate: async (req, res) => {
    try {
      const { id } = req.params;
      const data = await MTNcorporate.findByIdAndDelete(id);
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
