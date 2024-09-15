import { NavbarMenu, NavbarMenuAdmin } from '../../data'
import { FaSearch } from "react-icons/fa"
import { FaDumbbell } from "react-icons/fa6"
import { MdMenu } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"
import imgLogo from '../../assets/images/logo-website.jpeg'
import { useState } from 'react'
import ResponsiveMenu from './ResponsiveMenu'
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth'

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Sign Out"))
      .catch((error) => console.log(error))
  }
  return (
    <>
      <nav className='bg-primary navbar'>
        <div className="container flex justify-between items-center py-3">
          <div className='text-2xl font-bold flex items-center gap-2'>
            <img src={imgLogo} className='img-logo' alt='...'></img>
            <p className='text-white cursor-pointer' onClick={() => navigate('/')}>Website RT</p>
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-white'>
            {user ? (
              <>
                {
                  NavbarMenuAdmin.map((item) => {
                    return (
                      <li key={item.id}>
                        <a href={item.link} className='inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                      </li>
                    )
                  })
                }
              </>
            ) : (
              <>
                {
                  NavbarMenu.map((item) => {
                    return (
                      <li key={item.id}>
                        <a href={item.link} className='inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                      </li>
                    )
                  })
                }
              </>
              
            )}
            </ul>
          </div>
          {user ? (
            <div className='flex items-center'>
              <button onClick={handleSignOut} className='hover:bg-red-500 text-red-500 font-semibold hover:text-white rounded-md border border-red-300 px-6 py-2 duration-200 hidden md:block'>Logout</button>
            </div>
          ): (
            <div className='flex items-center'>
              <button onClick={() => navigate('/login')} className='hover:bg-secondary text-secondary font-semibold hover:text-white rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block'>Login</button>
            </div>
          )}
          
          <div className='md:hidden cursor-pointer' onClick={() => setOpen(!open)}>
            <MdMenu className='text-4xl'/>
          </div>
        </div>
      </nav>
      <ResponsiveMenu open={open}/>

    </>
  )
}

export default Navbar