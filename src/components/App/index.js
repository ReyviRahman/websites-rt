import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import Login from '../Login/Login';
import Dashboard from '../Dashboard';
import Navbar from '../Navbar/Navbar';
import DashboardAdmin from '../DashboardAdmin'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import SuratPengantar from '../SuratPengantar'
import StatusSurat from '../StatusSurat';
import ProsesSurat from '../ProsesSurat';
import JumlahPenduduk from '../JumlahPenduduk';
import Admin from '../Admin';

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
    Swal.fire({
      title: 'Loading...',
      text: 'Mohon Tunggu',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  } else {
    Swal.close();
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
          <Route path="/suratpengantar" element={<SuratPengantar />} />
          <Route path="/statussurat" element={<StatusSurat />} />
          <Route
            path='/dashboardadmin'
            element={
              <ProtectedRoute user={user}>
                <DashboardAdmin></DashboardAdmin>
              </ProtectedRoute>
            }>
              <Route path="admin" element={<Admin />} />
              <Route path="prosessurat" element={<ProsesSurat />} />
              <Route path="jumlahpenduduk" element={<JumlahPenduduk />} />
          </Route>
        </Routes>
      </Router>

    </div>
  );
};

export default App;