// const { promisify } = require('util');

// const handleRefreshToken = async (req, res) => {
//     try {
//         const cookies = req.cookies;
//         if (!cookies?.token) return res.sendStatus(401);

//         const refreshToken = cookies.token;
//         res.clearCookie('token', { httpOnly: true, sameSite: 'None', secure: true });

//         const foundUser = await User.findOne({ refreshToken }).exec();

//         if (!foundUser) {
//             const decoded = await promisify(jwt.verify)(
//                 refreshToken,
//                 process.env.REFRESH_TOKEN_SECRET
//             );

//             // Delete refresh tokens of hacked user
//             const hackedUser = await User.findOne({ id: decoded._id }).exec();
//             hackedUser.refreshToken = [];
//             await hackedUser.save();

//             return res.sendStatus(403);
//         }

//         const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

//         const decoded = await promisify(jwt.verify)(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         );

//         if (foundUser.username !== decoded.username) return res.sendStatus(403);

//         // Refresh token was still valid
//         const accessToken = jwt.sign(
//             { id: decoded._id },
//             process.env.ACCESS_TOKEN_SECRET,
//             { expiresIn: '1h' }
//         );

//         const newRefreshToken = jwt.sign(
//             { id: decoded._id },
//             process.env.REFRESH_TOKEN_SECRET,
//             { expiresIn: '1d' }
//         );

//         // Saving refreshToken with the current user
//         foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//         await foundUser.save();

//         // Creates Secure Cookie with refresh token
//         res.cookie('token', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

//         res.json({ jwt: accessToken });
//     } catch (error) {
//         console.error('Refresh Token Error:', error);
//         res.sendStatus(500);
//     }
// };

// module.exports = { handleRefreshToken };
