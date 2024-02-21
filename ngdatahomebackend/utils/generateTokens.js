const jwt = require('jsonwebtoken');
const UserToken = require('../model/userToken')
const generateTokens = async (user) => {
  try {
    const payload = { _id: user._id, roles: user.roles };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });

    // Verify and delete existing user token
    const existingUserToken = await UserToken.findOne({ userId: user._id });
    if (existingUserToken) {
      try {
        const decodedToken = jwt.verify(existingUserToken.token, process.env.REFRESH_TOKEN_SECRET);
        if (decodedToken) {
          // Token is valid, delete it
          await existingUserToken.deleteOne();
        }
      } catch (error) {
        console.error("Error verifying and deleting existing user token:", error);
        // Handle the error, log it, or rethrow it based on your application's needs
      }
    }

    // Save the new user token
    await new UserToken({ userId: user._id, token: refreshToken }).save();

    return { accessToken, refreshToken };
  } catch (err) {
    console.error("Error in generateTokens:", err);
    throw err; // Reject the Promise with the error
  }
};

module.exports = generateTokens;
