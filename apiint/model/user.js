const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  referredUser: {
    type: String,
  },
  isPaymentMade:{
    type:Boolean
  },
  totalEarning:{
      type:Number
  }
});

module.exports = mongoose.model('user', userSchema);