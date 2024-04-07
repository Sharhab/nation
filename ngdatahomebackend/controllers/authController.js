const User = require('../model/user');
const jwt = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const UserToken = require('../model/userToken'); 
const crypto = require('crypto');
//const sendEmail = require('../utils/sendemail'); 
const generateTokens = require ("../utils/generateTokens");


const authController = {
register: async (req, res) => {
    const {
      first_name,
      last_name,
      username,
      email,
      phone_number,
      password,
      confirm_password,
      pin
    } = req.body;

    if (!first_name || !last_name || !email || !username || !phone_number || !password || !confirm_password || !pin ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: 'This email is already in use' });
      }

      user = new User({
        first_name,
        last_name,
        username,
        email,
        phone_number,
        password,
        confirm_password,
        pin
      });
      await user.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      
      // Send a success message
      
      res.status(201).json({ data: {    first_name,
        last_name,
        username,
        email,
        phone_number,
        jwt: token,
        id: user._id, 
      message: 'registerd successfully, proceed to log in ' } 
      
       });
      
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error' });
    }
  },
Login: async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      const user = await User.findOne({ email }).exec();
  
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ data: {message: 'Invalid email or password.'} });
      }
      const { accessToken, refreshToken } = await generateTokens(user);
      // Send authorization roles and access token to the user
      res.status(200).json({
        data: {
          jwt: accessToken,
          user: refreshToken,
          id: user._id,
          message: 'Logged in successfully. Proceed to login',
        },
      });
  
    } catch (error) {
      console.error('Login Error:', error);
      if (!res.headersSent) {
        res.status(500).json({ error: 'Server Error', message: 'Unexpected error during login.' });
      }
    }
  },
logout: async (req, res) => {
    // Clear the token cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      expires: new Date(0),
      sameSite: 'none',
      secure: true,
    });

    // Send a logout success message
    res.status(200).json({ message: 'Logged out successfully' });
  },
getSingleUser: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: 'User ID required' });
      }
      console.log(id)
  
      const user = await User.findOne({ _id: id }).exec();
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      console.log('User:', user); // Log user information
  
      res.status(200).json({
        success: true,
        data: {
          user: user,
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
logedinUser: async (req, res)=>{
    const {token} = req.cookies.jwt
    if (!token) {
        return res.status(401).json(false);
      }
      const verifiedJwt = jwt.verify(token, process.env.JWT_SECRET)
      if(verifiedJwt){
        res.json(true)
      } else {
        res.json(false)
      }
  },
editUser: async (req, res )=>{
const user = await User.findById(req.user._id)
if(user){

  const { first_name,last_name,username, email, phone_number, _id} = user

  user.email = email,
  user.first_name = req.body.first_name || first_name;
  user.last_name = req.body.last_name || last_name;
  user.username = req.body.username|| username;
  user.phone_number = req.body.phone_number || phone_number;

  const editedUser = await user.save()

  res.status(200).json({ data: {

    _id,
    first_name: editedUser.first_name,last_name: editedUser.last_name,
    username: editedUser.username, email:editedUser.email, phone_number: editedUser.phone_number
  },

  message: 'successfully edited', 
})
}else{
  res.statu(404).json({
    message:'user not pound'
  })
}
  },
changePassword: async (req, res) => {
const user = await User.findById(req.user._id)
const {oldPassword, password} = req.body

if(!oldPassword || !password){
  res.status(400).json({message: 'oldPassword and new password are required'})
}

const verifiedPWD = await bcrypt.compare(oldPassword, password)
if(user&&verifiedPWD){
user.password = password
await user.save()
res.status(200).json({message: 'passwod changed successfully'})
}else{
  res.status(400).json({message: 'old password was incorrect'})
}
  },
forgotPassword: async (req, res) => {
const {email} = req.body

const user = await User.findOne({email})

if(!user){
  res.status(404).json({message: 'user not pound'})
}

//delete existing token in the data base
let token = await forgotToken.findOne({userId: user._id})
if(token){
  await token.deleteOne()
}


let resetToken = crypto.randomBytes(32).toString('hex') + user._id
const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')

await new forgotToken({
  userId: user._id,
  token: hashedToken,

  createdAt: Date.now(),
  expiresAt: Date.now() + 30 * (60 * 1000)
}).save()

const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`

const message = `<h2>hello${user.first_name}</h2>
<p>please use the url below to reset your password</p>
<p>this reset link is only valid for 30 minuts </p>

<a href=${resetUrl} clicktracking=off> ${resetUrl}</a>

<p>Regard...</p>
<p>S. Data Plus...</p>
`;
const subject = 'password reset request'
const send_to = user.email
send_from = process.env.EMAIL_USER

try{
await  sendEmail(subject, message, send_to, send_from)
res.status(200).json({message: 'reset password email sent'})
}catch(err){
res.status(500).json({message: 'email not sent! try again'})
}

console.log(resetToken)
console.log(hashedToken)
  },
resetPassword: async (req, res) =>{
const {password} = req.body
const {resetToken} = req.params

const hashedToken = crypto
.createHash('sha256')
.update(resetToken)
.digest('hex')

const userToken = await forgotToken.findOne({
  token: hashedToken,
  expiresAt: {$gt: Date.now()}
})
if(!userToken){
  res.status(400).json({message: 'invalid token'})
}

const user = User.findOne({_id:userToken.userId})
user.password = password
await user.save()

 res.status(200).json({message: 'password reset sucessfull, please login'})
  }
};

module.exports = authController;

