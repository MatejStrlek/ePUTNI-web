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
        usersMap[doc.id] = {
          displayName: doc.data().displayName,
          photoUrl: doc.data().photoUrl,
          role: doc.data().role,
          email: doc.data().email
        };
        return { ...doc.data(), id: doc.id };
      });

      const vehiclesMap = {};
      vehiclesData.docs.forEach((doc) => {
        vehiclesMap[doc.id] = {
          vehicleModel: doc.data().vehicleModel,
          licensePlate: doc.data().licensePlate,
          vehicleType: doc.data().vehicleType
        };
      });

      const warrantsArr = warrantData.docs.map((doc) => {
        const user = usersMap[doc.data().userId];
        return {
          ...doc.data(),
          id: doc.id,
          userName: user.displayName,
          userPhotoUrl: user.photoUrl,
          email: user.email,
          role: user.role,
          vehicleModel: vehiclesMap[doc.data().vehicleId]?.vehicleModel,
          licensePlate: vehiclesMap[doc.data().vehicleId]?.licensePlate,
          vehicleType: vehiclesMap[doc.data().vehicleId]?.vehicleType == 'PRIVATE' 
          ? 'osobno vozilo' 
          : 'službeno vozilo'
        };
      });

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