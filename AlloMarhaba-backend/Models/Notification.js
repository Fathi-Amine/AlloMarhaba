const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  text: String,
  livreur: {
    type: mongoose.Schema.Types.String,
    ref: 'Users' 
  },
  createdAt: {
    type: Date,
    default: Date.now,
},
});


module.exports = mongoose.model("Notification", notificationSchema);
