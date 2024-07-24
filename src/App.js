import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebaseconfig';

function App() {
  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(users);
    }

    getUsers();
  }, []);

  return <div className='App'>{users.map((user) => {
    return(
      <div>
        {" "}
        <h1>{user.displayName}</h1>
        <h2>{user.email}</h2>
      </div>
    );
  })}</div>;
}

export default App;