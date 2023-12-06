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
    const [notifications, setNotifications] = useState([]);


    useEffect(() => {
        const fetchNotifications = async () => {
            const user = userInfo?.user?.email;
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/notifications/${user}`);
                    setNotifications(response.data.notifications);
                    console.log(notifications)
                } catch (error) {
                    console.error('Error fetching notifications:', error);
                }
            }
        };

        fetchNotifications();

        const socket = io('http://localhost:5000');
        socket.on('orderStatusChangedToPrepared', (data) => {
            const { orderId, restaurant } = data;
            setPreparedOrderInfo({ orderId, restaurant });
            setOrderPrepared(true);
        });

        return () => {
            socket.disconnect();
        };
    }, [userInfo]);
    
    useEffect(() => {
        console.log('Updated notifications:', notifications);
      }, [notifications]);

    const handleNotificationClick = async () => {
        try {
            const notificationText = `You took an Order from ${preparedOrderInfo.restaurant.name} Restaurant`;
            const user = userInfo.user.email;

            await axios.post('http://localhost:5000/api/assign-order-to-livreur', {
                orderId: preparedOrderInfo.orderId,
                user,
                notificationText,
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
                            <div className='bg-slate-100 w-3/4 m-auto mt-5 rounded-2xl'>
                                <p className='p-4 font-bold text-red-700'>Recent Orders to Deliver them</p>
                                {
                                    orderPrepared && !claimedOrder ? (
                                        <div className='flex justify-between bg-cyan-300 p-4'>
                                            <p className='flex items-center text-slate-700'>
                                                <div className="h-2 w-2 bg-red-500 rounded-full mr-2"></div>
                                                <div>Order ready for delivery from <span className='font-semibold'>&nbsp;{preparedOrderInfo.restaurant.name}&nbsp;</span>Restaurant</div>
                                            </p>
                                            <div className='bg-rose-500 text-gray-100 p-2 rounded-2xl hover:bg-rose-600 cursor-pointer' onClick={handleNotificationClick}>Click to Claim it</div>
                                        </div>
                                    ) : (
                                        <p className='pl-4 pb-4 text-slate-500'>There is no order at the moment ..</p>
                                    )
                                }
                            </div>
                            <div className='w-3/4 m-auto mb-4 mt-5 rounded-2xl bg-red-100'>
                                <p className='p-4'>Order History</p>
                                {notifications.length === 0 ? (
                                    <p className='pl-4 pb-4 text-slate-500'>No orders were taken ..</p>
                                ) : (
                                    <ul className='bg-neutral-100 pb-4'>
                                        {notifications.map(notification => (
                                            <li className='pt-4 pl-4 flex items-center' key={notification._id}>
                                                <span className="h-2 w-2 bg-sky-500 rounded-full mr-2"></span>
                                                {notification.text}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
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