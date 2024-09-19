import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    try {
      Swal.fire({
        title: 'Please wait...',
        allowOutsideClick: false, // Mencegah user menutup loading dengan klik di luar
        didOpen: () => {
          Swal.showLoading(); // Memunculkan loading spinner
        }
      });
      await signInWithEmailAndPassword(auth, email, password)
      Swal.close()
      navigate('/dashboardadmin')
    } catch (error) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
      
  };

  return (
    <div className="container flex justify-center items-center h-screen border border-primary">
      <form className='border border-primary rounded px-6 py-4 form-w' onSubmit={handleLogin}>
        <h1 className='text-2xl font-bold mb-2'>Admin Login</h1>

        <label for="email" class="block mb-3">
          <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="email"
          type="email"
          name="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={e => setEmail(e.target.value)} />
        </label>

        <label for="password" class="block">
          <span class="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" 
          id="password"
          type="password"
          name="password"
          placeholder="Masukkan Password"
          value={password}
          onChange={e => setPassword(e.target.value)} />
        </label>
       
        <button type="submit" class="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
