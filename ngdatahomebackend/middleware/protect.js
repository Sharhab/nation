// const jwt = require('jsonwebtoken');
// const jwtSecret = process.env.JWT_SECRET;

// // Middleware to protect routes that require authentication
// const protect = async (req, res, next) => {
//   try {
//     // Get the authorization header
//     const authHeader = req.headers.authorization || req.headers.Authorization;

//     // Check if the token is missing or has an invalid format
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       console.log('Invalid or missing token format');
//       return res.sendStatus(401);
//     }

//     // Extract the token from the authorization header
//     const token = authHeader.split(' ')[1];
//     console.log('Received Token:', token);

//     // Check if the token is undefined or empty
//     if (!token) {
//       console.log('Token is undefined or empty');
//       return res.sendStatus(401);
//     }

//     // Verify the token using the secret and HS256 algorithm
//     jwt.verify(token, jwtSecret, { algorithm: 'HS256' }, (err, decodedToken) => {
//       if (err) {
//         console.log('Token verification failed:', err.message);
//         return res.sendStatus(403); // Invalid token
//       }

//       // Log the decoded payload for inspection
//       console.log('Decoded Token Payload:', decodedToken);

//       // Attach the user details to the request for further processing
//       req.user = decodedToken;

//       // Continue to the next middleware or route handler
//       next();
//     });
//   } catch (error) {
//     console.error('Error in Protect middleware:', error);
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

// module.exports = protect;
