import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { defaultIcon, redIcon, blueIcon } from './markerIcons';

const socket = io.connect(process.env.REACT_APP_SOCKET_SERVER);

const useMapFunctions = () => {
  const [users, setUsers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapCenter, setMapCenter] = useState([37.455135616426006, 127.1334457397461]);
  const [userType, setUserType] = useState('뚜벅이'); // Default userType
  const [status, setStatus] = useState('off'); // Default status
  const [message, setMessage] = useState('');
  const [userCount, setUserCount] = useState({ total: 0, walkers: 0, drivers: 0 });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = [latitude, longitude];
          setCurrentPosition(newPosition);
          setMapCenter(newPosition);
          console.log("Sending location to server:", newPosition);
          socket.emit('sendLocation', {
            userId: socket.id,
            coordinates: newPosition,
            userType,
            status,
            message
          });
        });
      } catch (err) {
        console.error('Error fetching current position:', err);
      }
    };

    fetchLocation();

    socket.on('locationUpdate', (data) => {
      console.log("Received location update:", data);
      setUsers(data);
    });

    socket.on('userCountUpdate', (count) => {
      console.log("Received user count update:", count);
      setUserCount(count);
    });

    return () => {
      socket.off('locationUpdate');
      socket.off('userCountUpdate');
    };
  }, [userType, status, message]);

  const handleUserTypeChange = () => {
    try {
      const newUserType = userType === '뚜벅이' ? '부릉이' : '뚜벅이';
      setUserType(newUserType);
      console.log("Changing user type:", newUserType);
      socket.emit('sendLocation', {
        userId: socket.id,
        coordinates: currentPosition,
        userType: newUserType,
        status,
        message
      });
    } catch (err) {
      console.error('Error changing user type:', err);
    }
  };

  const handleStatusChange = () => {
    try {
      const newStatus = status === 'on' ? 'off' : 'on';
      setStatus(newStatus);
      console.log("Changing status:", newStatus);
      socket.emit('sendLocation', {
        userId: socket.id,
        coordinates: currentPosition,
        userType,
        status: newStatus,
        message
      });
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const handleMessageChange = (e) => {
    try {
      const newMessage = e.target.value;
      setMessage(newMessage);
      console.log("Changing message:", newMessage);
      socket.emit('sendLocation', {
        userId: socket.id,
        coordinates: currentPosition,
        userType,
        status,
        message: newMessage
      });
    } catch (err) {
      console.error('Error changing message:', err);
    }
  };

  const requestCarpool = (userId) => {
    socket.emit('requestCarpool', { userId });
  };

  const getIcon = (userType) => {
    return userType === '뚜벅이' ? blueIcon : redIcon;
  };

  return {
    users,
    currentPosition,
    mapCenter,
    userType,
    status,
    message,
    userCount,
    handleUserTypeChange,
    handleStatusChange,
    handleMessageChange,
    requestCarpool,
    getIcon
  };
};

export default useMapFunctions;
