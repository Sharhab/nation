const UserToken = require("../model/userToken");
const jwt = require ("jsonwebtoken");
const verifyRefreshToken = require("../utils/verifyRefreshTokens");

// get new access token
const refreshTokenRout =  async (req, res) => {
	const token = req.headers.authorization || req.headers.Authorization;

    if (!token || !token.startsWith('Bearer ')) {
      console.log('Invalid or missing token format');
      return res.sendStatus(401);
    }

	verifyRefreshToken(token)
		.then(({ tokenDetails }) => {
			const payload = { _id: tokenDetails._id, roles: tokenDetails.roles };
			const accessToken = jwt.sign(
				payload,
				process.env.ACCESS_TOKEN_SECRET,
				{ expiresIn: "1h" }
			);
			res.status(200).json({
				error: false,
				jwt: accessToken,
				message: "Access token created successfully",
			});
		})
		.catch((err) => res.status(400).json(err));
};
module.exports = refreshTokenRout
// logout
const logout =  async (req, res) => {
	try {
		const token = req.headers.authorization || req.headers.Authorization;

		if (!token || !token.startsWith('Bearer ')) {
		  console.log('Invalid or missing token format');
		  return res.sendStatus(401);
		}
	
		const userToken = await UserToken.findOne({ token: token});
		if (!userToken)
			return res
				.status(200)
				.json({ error: false, message: "Logged Out Sucessfully" });

		await userToken.remove();
		res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: true, message: "Internal Server Error" });
	}
};

module.exports = logout;