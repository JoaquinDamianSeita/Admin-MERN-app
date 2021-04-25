const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({ 
  name: {
    type: String,
    required: [true, "Please set a name"]
  },
  tel: {
    type: String,
    required: [true, "Please set a Phone"]
  },
  email: {
    type: String,
  },
  adress: {
    type: String,
  }
});

module.exports = mongoose.model('Contact', contactSchema); 