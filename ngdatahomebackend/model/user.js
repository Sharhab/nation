// models/User.js import
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    email: {
        type: String,
        minLength: 6,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    provider: {
        type: String
    },
    password: {
        type: String,
        minLength: 6,
        private: true
    },
    pin: {
        type: String,
        maxLength: 4,
        private: true
    },
    resetPasswordToken: {
        type: String,
        private: true
    },
    confirmationToken: {
        type: String,
        private: true
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    blocked: {
        type: Boolean,
        default: false
    },
    roles: {
		type: [String],
		enum: ["user", "admin", "super_admin"],
		default: ["user"],
	},
    permissions: [{
        type: String,
        enum: ['createUser', 'manageTopUp', 'viewReport', 'manageUser'],
        // You might not store permissions for each user but derive them based on the role
      }],
    AccountBalance: {
        type: Number,
        default: 0
    },
    PreviousBalance: {
        type: Number,
        default: 0
    },
    exam_pins_purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExamPinOrder'
    }],
    // Add other relations similarly...
    monnify_bank_details: [{
        displayName: {
            type: String
        },
        // Add other fields for the component...
    }],
    hasAccountNum: {
        type: Boolean,
        default: false,
        required: true
    },
    updateBvn: {
        type: Boolean,
        default: false
      },
      managedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }],
      
}, {
    timestamps: true
    
});


// Hash the user password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
