
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client"

const Commands = () => {
    const [notification, setNotification] = useState(false)
    const [socket] = useState(io('http://localhost:5000'));
    const user = "manager"


    const handleNotification = (commandName, receiverName) => {
        setNotification(true);
        socket.emit('sendNotification', {
            senderName: user,
            receiverName,
            message: `Command ${commandName} is ready`,
        });
    };


    useEffect(() => {
        const socket = (io("http://localhost:5000"))
        console.log(socket)
    }, [])

    const commands = [
        {
            id: 1,
            name: 'pizza',
            isReady: false,
            deliveryPersons: [
                {
                    id: 101,
                    name: "john"
                },
            ],
        },
        {
            id: 1,
            name: 'tacos',
            isReady: false,
            deliveryPersons: [
                {
                    id: 101,
                    name: "doe"
                },
            ],
        },
        {
            id: 1,
            name: 'lazania',
            isReady: false,
            deliveryPersons: [
                {
                    id: 101,
                    name: "marcner"
                },
            ],
        }
    ]
    return (
        <div>
            {commands.map(command => (
                <div key={command.id}>
                    {command.deliveryPersons.map(person => (
                        <div key={person.id}>
                            <h3>{command.name}</h3>
                            <span>Livreur {person.name}</span>
                            <button onClick={() => handleNotification(command.name, person.name)}>
                                Mark as Ready
                            </button>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Commands