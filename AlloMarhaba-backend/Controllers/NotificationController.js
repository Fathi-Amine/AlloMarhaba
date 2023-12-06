// const Notification = require('../Models/Notification');

// const getAllNotificationsForUser = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const notifications = await Notification.find({ livreur: email });

//     res.status(200).json({ notifications });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching notifications', error: error.message });
//   }
// };

// module.exports = {
//   getAllNotificationsForUser,
// };