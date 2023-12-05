
// import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons'; '@fortawesome/free-solid-svg-icons'
// import { io } from "socket.io-client"


// const Notification = () => {
//     const [notifications, setNotifications] = useState([]);

//     const [socket, setSocket] = useState(true)
//     const user = "manager"

//     useEffect(() => {
//         const socket = io('http://localhost:5000');
//         socket.on('connect', () => {
//             console.log(socket);
//         });

//         socket.on("sendNotification", (message) => {
//             // Handle the received notification here
//             console.log(`Received notification: ${message}`);
//             setNotifications(prev => ([...prev, message])); // Update the notification state
//         });

//         return () => {
//             socket.disconnect(); // Clean up the socket connection on unmount
//         };
//     }, []);

//     return (
//         <div>
//             <span>Logo</span>
//             <div className='icone'>
//                 <FontAwesomeIcon icon={faBell} />
//                 {notifications.map((notification, index) => (
//                         <div key={index}>{notification}</div>
//                     ))}
//                 <div className='counter'>1</div>
//             </div>
//         </div>
//     )
// } 

// export default Notification


import React, { useState } from 'react';
import axios from 'axios';

const Notification = () => {
  const [status, setStatus] = useState('');

  const handleChangeStatus = async () => {
    try {
      const user_id = 'manager'; // Replace this with your user_id
      const response = await axios.post('/changeStatus', {
        status,
        user_id, // Pass any necessary data to your backend
      });

      if (response.status === 200) {
        console.log(response.data.message); // Log the message from the server
        // Handle the response data as needed
      } else {
        console.error('Failed to change status');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        placeholder="Enter status"
      />
      <button onClick={handleChangeStatus}>Change Status</button>
    </div>
  );
};

export default Notification;