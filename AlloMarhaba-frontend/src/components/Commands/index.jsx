
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client"

const Commands = () => {
    const [notification, setNotification] = useState(false)
    const [commands, setCommands] = useState([
        {
            id: 1,
            name: 'pizza',
            isReady: false,
            claimed: false
        },
        {
            id: 2,
            name: 'tacos',
            isReady: false,
            claimed: false
        },
        {
            id: 3,
            name: 'lazania',
            isReady: false,
            claimed: false
        }
        // Other commands...
      ]);
    const [socket] = useState(io('http://localhost:5000'));
    const user = "manager"


    const handleNotification = (commandName) => {
        const updatedCommands = commands.map(command => {
            if (command.name === commandName) {
              return {
                ...command,
                isReady: true 
              };
            }
            return command;
          });

          setCommands(updatedCommands);
          console.log(commands)

        socket.emit('sendNotification', {
            senderName: user,
            message: `Command ${commandName} is ready`,
        });
    };


    useEffect(() => {
        const socket = (io("http://localhost:5000"))
        // console.log(socket)
        console.log(commands)
    }, [commands])

    
    return (
        <div>
            {commands.map(command => (
                <div key={command.id}>
                    <h3>{command.name}</h3>
                    <div>
                        <button onClick={() => handleNotification(command.name)}>
                            Mark as Ready
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Commands