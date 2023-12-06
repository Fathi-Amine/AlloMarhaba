const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text: String,
  livreur: {
    type: mongoose.Schema.Types.String,
    ref: 'Users' 
  }
});


module.exports = mongoose.model("Notification", notificationSchema);
