import React, {useEffect, useState} from 'react';
import { io } from 'socket.io-client';
import Hero from '../components/Hero.jsx'
import {useSelector} from "react-redux";
import axios from 'axios'

const Home = () => {
  const {userInfo} = useSelector((state)=>state.auth)
  const [orderPrepared, setOrderPrepared] = useState(false);
  const [preparedOrderInfo, setPreparedOrderInfo] = useState(null);

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

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000');
//     setSocket(newSocket);

//     newSocket.on('connect', () => {
//       console.log('Connected to server');
//     });

//     newSocket.on('disconnect', () => {
//       console.log('Disconnected from server');
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

  const handleNotificationClick = () => {
  
    axios.post('http://localhost:5000/api/assign-order-to-livreur', {
      orderId: preparedOrderInfo.orderId,
      user: userInfo.user.email,
    })
    
      .catch((error) => {
        console.error('Error assigning order:', error);
      });
  };

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
              {orderPrepared && preparedOrderInfo && (
                <div onClick={handleNotificationClick}>
                  <p>
                    There is an order ready for delivery from {preparedOrderInfo.restaurant.name} Restaurant!
                  </p>
                </div>
              )}
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