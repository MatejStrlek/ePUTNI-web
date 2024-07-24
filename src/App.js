import { collection, getDocs } from 'firebase/firestore';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebaseconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [warrants, setWarrants] = useState([]);
  const [users, setUsers] = useState([]);

  const warrantCollectionRef = collection(db, 'warrants');
  const userCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getData = async () => {
      const userData = await getDocs(userCollectionRef);
      const warrantData = await getDocs(warrantCollectionRef);
      
      const usersMap = {};
      userData.docs.forEach((doc) => {
        usersMap[doc.id] = doc.data().displayName;
      });

      const warrants = warrantData.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
          userName: usersMap[doc.data().userId],
        };
      });

      setWarrants(warrants);
    };

    getData();
  }, []);

  return (
    <div className="App container mt-5">
      <h1 className="text-center mb-4">Putni nalozi</h1>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Član</th>
              <th>Start City</th>
              <th>End City</th>
              <th>Description</th>
              <th>Finished</th>
            </tr>
          </thead>
          <tbody>
            {warrants.map((warrant) => (
              <tr key={warrant.id}>
                <td>{warrant.userName}</td>
                <td>{warrant.startCity}</td>
                <td>{warrant.endCity}</td>
                <td>{warrant.description}</td>
                <td>{warrant.finished ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;