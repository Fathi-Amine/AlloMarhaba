
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; '@fortawesome/free-solid-svg-icons'
import { io } from "socket.io-client"


const Notification = ({receiverName}) => {
    const [notification, setNotification] = useState(true)
    const [socket, setSocket] = useState(true)
    const user = "manager"

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('connect', () => {
            console.log(socket);
        });

        socket.on(`notification_${socket.id}`, (message) => {
            // Handle the received notification here
            console.log(`Received notification for ${receiverName}: ${message}`);
        });

        return () => {
            socket.disconnect(); // Clean up the socket connection on unmount
        };
    }, [receiverName]);

    return (
        <div>
            <span>Logo</span>
            <div className='icone'>
                <FontAwesomeIcon icon={faBell} />
                <div className='counter'>1</div>
            </div>
        </div>
    )
} 

export default Notification