import React, { useState, useEffect } from 'react';
import Header from './Header';
import Table from './Table';
import WarrantDetails from './WarrantDetails';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseconfig.js';

const Dashboard = ({ setIsAuthenticated }) => {
  const [warrants, setWarrants] = useState([]);
  const [users, setUsers] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedWarrant, setSelectedWarrant] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const userData = await getDocs(collection(db, 'users'));
      const warrantData = await getDocs(collection(db, 'warrants'));
      const vehiclesData = await getDocs(collection(db, 'vehicles'))
      
      const usersMap = {};
      userData.docs.forEach((doc) => {
        usersMap[doc.id] = doc.data().displayName;
      });

      const vehiclesMap = {};
      vehiclesData.docs.forEach((doc) => {
        vehiclesMap[doc.id] = {
          model: doc.data().vehicleModel,
          licensePlate: doc.data().licensePlate
        };
      });

      const warrants = warrantData.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          userName: usersMap[doc.data().userId], 
          model: vehiclesMap[doc.data().vehicleId]?.vehicleModel,
          licensePlate: vehiclesMap[doc.data().vehicleId]?.licensePlate
        };
      });

      setWarrants(warrants);
    };

    getData();
  }, []);

  const handleView = id => {
    const [warrant] = warrants.filter(warrant => warrant.id === id);
    setSelectedWarrant(warrant);
    setIsViewing(true);
  };

  return (
    <div className="container">
      {!isViewing && (
        <>
          <Header setIsAuthenticated={setIsAuthenticated} />
          <Table warrants={warrants} handleView={handleView} />
        </>
      )}
      {isViewing && (
        <WarrantDetails 
          warrant={selectedWarrant} 
          setIsViewing={setIsViewing}
        />
      )}
    </div>
  );
};

export default Dashboard;