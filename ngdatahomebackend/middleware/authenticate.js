const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticate = async (req, res, next) => {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;

    // Check if the token is missing or has an invalid format
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Invalid or missing token format' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret and HS256 algorithm
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Fetch user details from the database based on the decoded token
    const user = await User.findById(decodedToken._id);

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Attach the user details to the request for further processing
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token has expired' });
    }

    console.error('Error in authentication middleware:', error);
    return res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authenticate;
