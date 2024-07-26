import React, { useState, useEffect } from 'react';
import Header from './Header';
import Table from './Table';
import Filter from './Filter';
import WarrantDetails from './WarrantDetails';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfig.js';

const Dashboard = ({ setIsAuthenticated }) => {
  const [warrants, setWarrants] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredWarrants, setFilteredWarrants] = useState([]);
  const [isViewing, setIsViewing] = useState(false);
  const [selectedWarrant, setSelectedWarrant] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const userData = await getDocs(collection(db, 'users'));
      const warrantData = await getDocs(collection(db, 'warrants'));
      const vehiclesData = await getDocs(collection(db, 'vehicles'))

      const usersMap = {};
      const userArr = userData.docs.map((doc) => {
        usersMap[doc.id] = doc.data().displayName;
        return { ...doc.data(), id: doc.id };
      });

      const vehiclesMap = {};
      vehiclesData.docs.forEach((doc) => {
        vehiclesMap[doc.id] = {
          vehicleModel: doc.data().vehicleModel,
          licensePlate: doc.data().licensePlate
        };
      });

      const warrantsArr = warrantData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        userName: usersMap[doc.data().userId],
        vehicleModel: vehiclesMap[doc.data().vehicleId]?.vehicleModel,
        licensePlate: vehiclesMap[doc.data().vehicleId]?.licensePlate,
      }));

      setWarrants(warrantsArr);
      setUsers(userArr);
      setFilteredWarrants(warrantsArr);
    };

    getData();
  }, []);

  const handleView = id => {
    const [warrant] = warrants.filter(warrant => warrant.id === id);
    setSelectedWarrant(warrant);
    setIsViewing(true);
  };

  const handleAccept = async (warrantId) => {
    const warrantRef = doc(db, 'warrants', warrantId);
    await updateDoc(warrantRef, { checkedByFinanceTeam: true });
    
    setWarrants((prevWarrants) =>
      prevWarrants.map((warrant) =>
        warrant.id === warrantId
          ? { ...warrant, checkedByFinanceTeam: true }
          : warrant
      )
    );
    setFilteredWarrants((prevWarrants) =>
      prevWarrants.map((warrant) =>
        warrant.id === warrantId
          ? { ...warrant, checkedByFinanceTeam: true }
          : warrant
      )
    );
  };

  const handleFilter = (userId) => {
    if (userId === '') {
      setFilteredWarrants(warrants);
    } else {
      const filtered = warrants.filter(warrant => warrant.userId === userId);
      setFilteredWarrants(filtered);
    }
  };

  return (
    <div className="container">
      {!isViewing && (
        <>
          <Header setIsAuthenticated={setIsAuthenticated} />
          <Filter users={users} onFilter={handleFilter} />
          <Table warrants={filteredWarrants} handleView={handleView} handleAccept={handleAccept} />
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