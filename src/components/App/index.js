import React, { useState, useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/react"

import Login from '../Login';
import Dashboard from '../Dashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  return (
    <>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
      <SpeedInsights />
    </>
  );
};

export default App;