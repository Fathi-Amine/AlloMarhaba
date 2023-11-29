
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

        socket.on("sendNotification", (message) => {
            // Handle the received notification here
            console.log(`Received notification: ${message}`);
            setNotifications(prev => ([...prev, message])); // Update the notification state
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection on unmount
        };
    }, []);

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