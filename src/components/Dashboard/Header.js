import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logout from '../Logout';

const Header = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <header className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
      <h2>Putni nalozi</h2>
      <div>
        <Logout setIsAuthenticated={setIsAuthenticated} />
      </div>
    </header>
  );
};

export default Header;