
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; '@fortawesome/free-solid-svg-icons'
import { io } from "socket.io-client"


const Notification = () => {
    const [notifications, setNotifications] = useState([]);

    const [socket, setSocket] = useState(true)
    const user = "manager"

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('connect', () => {
            console.log(socket);
        });

        socket.on("notificationForDeliveryPersons", (message) => {
            // Handle the received notification here
            console.log(`Received notification: ${message}`);
            setNotifications(prev => ([...prev, message])); // Update the notification state
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection on unmount
        };
    }, []);

    const handleClaimCommand = (commandId) => {
        const updatedCommands = commands.map(command => {
          if (command.id === commandId) {
            return {
              ...command,
              claimedBy: user, // Track who claimed the command
              claimed: true // Mark the command as claimed
            };
          }
          return command;
        });
      
        setCommands(updatedCommands);
      
        // Disable notifications for this command for other persons
        // Emit an event to the backend to notify others that the command has been claimed
        socket.emit('claimCommand', { commandId, user });
      };

    return (
        <div>
            <span>Logo</span>
            <div className='icone'>
                <FontAwesomeIcon icon={faBell} />
                {notifications.map((notification, index) => (
                        <div key={index}>{notification}</div>
                    ))}
                <div className='counter'>1</div>
            </div>
        </div>
    )
} 

export default Notification