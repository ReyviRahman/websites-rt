import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import imgTangan from '../../assets/images/img-tangan.png'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
      if (email == "adminrt@gmail.com") {
        navigate('/dashboardadmin/admin')
      } else {
        navigate('/')
      }
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
    <div className="container flex justify-center items-center h-screen mx-auto">
      <div className='me-20'>
        <img src={imgTangan} width={300} alt='' className='mx-auto'/>
        <h1 className='font-semibold'>Jika Anda belum memiliki akun, 
        Anda dapat <span className='text-primary cursor-pointer font-semibold' onClick={() => navigate('/register')}>Mendaftar Disini!</span></h1>
      </div>
      <div>
        <form className='border border-primary rounded px-6 py-4 form-w' onSubmit={handleLogin}>
          <h1 className='text-2xl font-bold mb-2 text-primary'>Login</h1>

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

          <label htmlFor="password" className="block">
            <span className="after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Password
            </span>
            <div className="relative">
              <input
                className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Masukkan Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
              >
                <i className="material-icons">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </i>
              </button>
            </div>
          </label>
        
          <button type="submit" class="mt-4 w-full bg-primary text-white font-bold p-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
