import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from '../Login/Login';
import Dashboard from '../Dashboard';
import Navbar from '../Navbar/Navbar';
import DashboardAdmin from '../DashboardAdmin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const App = () => {
  const auth = getAuth()
  const [user, setUser] = useState(null)
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        setIsFetching(false)
        return
      }
      setIsFetching(false)
      setUser(null)
    })
    return () => unsubscribe()
  }, [])
  
  if (isFetching) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Router>
        {user ? (
          <Navbar user={user}/>
        ) : (
          <Navbar user={null}/>
        )}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route
            path='/dashboardadmin'
            element={
              // <ProtectedRoute user={user}>
              //   <DashboardAdmin></DashboardAdmin>
              // </ProtectedRoute>
                <DashboardAdmin />
            }/>
        </Routes>
      </Router>

    </div>
  );
};

export default App;