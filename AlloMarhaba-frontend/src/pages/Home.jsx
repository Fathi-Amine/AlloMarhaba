import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Hero from '../components/Hero.jsx'
import { useSelector } from "react-redux";
import axios from 'axios'
const socket = io('http://localhost:5000');

const Home = () => {
    const { userInfo } = useSelector((state) => state.auth)
    const [orderPrepared, setOrderPrepared] = useState(false);
    const [preparedOrderInfo, setPreparedOrderInfo] = useState(null);
    const [claimedOrder, setClaimedOrder] = useState(false);


    useEffect(() => {
        const socket = io('http://localhost:5000');
        socket.on('orderStatusChangedToPrepared', (data) => {
            const { orderId, restaurant } = data;
            setPreparedOrderInfo({ orderId, restaurant });
            setOrderPrepared(true);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleNotificationClick = async () => {
        try {
          const notificationText = `There is an order ready for delivery from ${preparedOrderInfo.restaurant.name} Restaurant!`;
          const user = userInfo.user.email;
      
          await axios.post('http://localhost:5000/api/assign-order-to-livreur', {
            orderId: preparedOrderInfo.orderId,
            user,
            notificationText, // Include the notification text in the request
          });
      
          setClaimedOrder(true);
          console.log(claimedOrder);
        } catch (error) {
          console.error('Error assigning order:', error);
        }
      };

    socket.on('orderAssigned', (data) => {
        if (data.claimedOrder) {
          setClaimedOrder(true);
        }
      });

    return (
        <div>
            {userInfo ? (
                <div>
                    <div className="user-info">
                        <h2>Welcome, {userInfo.user.name}!</h2>
                        <p>Email: {userInfo.user.email}</p>
                        <p>Role: {userInfo.user.role}</p>
                    </div>
                    {userInfo.user.role === 'delivery' && (
                        <div>
                            <p>Special delivery elements...</p>
                            {
                                orderPrepared && !claimedOrder ? (
                                    <div onClick={handleNotificationClick}>
                                        <p>
                                            There is an order ready for delivery from {preparedOrderInfo.restaurant.name} Restaurant!
                                        </p>
                                    </div>
                                ) : (
                                    <p>There is no orders.</p>
                                )
                            }
                        </div>
                    )}
                </div>
            ) : (
                <Hero />
            )}
        </div>
    );
}

export default Home