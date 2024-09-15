import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'

const Dashboard = () => {
  return (
    <div className='pt-10'>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
      <h1 className='text-3xl'>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
