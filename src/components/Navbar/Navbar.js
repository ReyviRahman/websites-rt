import { NavbarMenu, NavbarMenuAdmin, NavbarMenuBendahara } from '../../data'
import { MdMenu } from "react-icons/md"
import imgLogo from '../../assets/images/logo-website.jpeg'
import React, { useState, useEffect } from 'react'
import ResponsiveMenu from './ResponsiveMenu'
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import imgTangan from '../../assets/images/img-tangan.png'

const Navbar = ({ user, role }) => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const auth = getAuth()
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out")
        navigate('/')
      })
      .catch((error) => console.log(error))
  }
  const [index, setIndex] = useState(0);
  const handleClick = (i) => {
    setIndex(i === index ? null : i); 
  };
  
  useEffect(() => {
    if (role == "Admin") {
      setIndex(3); // Jika role ada, set index menjadi 3
      navigate('/dashboardadmin/admin')
    } else if (role == "Bendahara"){
      setIndex(3); // Jika role null, set index menjadi 0
      navigate('/dashboardbendahara/bendahara')
    } else {
      setIndex(0); // Jika role null, set index menjadi 0
    }
  }, [role]);

  return (
    <>
      <nav className='bg-primary navbar'>
        <div className="px-2 flex justify-between items-center">
          <div className='text-2xl font-bold flex items-center gap-2'>
            <img src={imgTangan} className='img-logo' alt='...'></img>
            <p className='text-white cursor-pointer' onClick={() => navigate('/')}>SIMARATA</p>
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-white'>
            {role === "Admin" ? (
            <>
              {NavbarMenuAdmin.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => {
                        if (index !== i) {
                          handleClick(i);
                        }
                        navigate(item.link);
                      }}
                      className={`${
                        index === i ? "bg-secondary" : "hover:text-secondary"
                      } rounded cursor-pointer inline-block py-1 px-3 font-semibold`}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </>
            ) : role === "Bendahara" ? (
            <>
              {NavbarMenuBendahara.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => {
                        if (index !== i) {
                          handleClick(i);
                        }
                        navigate(item.link);
                      }}
                      className={`${
                        index === i ? "bg-secondary" : "hover:text-secondary"
                      } rounded cursor-pointer inline-block py-1 px-3 font-semibold`}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </>
            ) : (
            <>
              {NavbarMenu.map((item, i) => {
                return (
                  <li key={i}>
                    <a
                      onClick={() => {
                        if (index !== i) {
                          handleClick(i);
                        }
                        navigate(item.link);
                      }}
                      className={`${
                        index === i ? "bg-secondary" : "hover:text-secondary"
                      } rounded cursor-pointer inline-block py-1 px-3 font-semibold`}
                    >
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </>
            )}
            <Menu as="div" className="relative inline-block text-left">
              { role == "User" && (
                <>
                  <div>
                    <MenuButton className={`${index === 5 ? 'bg-secondary' : 'hover:text-white'} ${index === 5 ? 'bg-secondary' : 'hover:text-white'} inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary`}>
                      Layanan
                      <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        <MenuItem>
                          <a
                            onClick={() => {
                              navigate('/suratpengantar')
                              console.log(index)
                              if (index !== 5 && user != null) {
                                setIndex(5)
                              } else if (index !== 4) {
                                setIndex(4)
                              }
                            }}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary data-[focus]:text-white"
                          >
                            Surat Pengantar
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            onClick={() => {
                              navigate('/statussurat')
                              if (index !== 5 && user != null) {
                                setIndex(5)
                              } else if (index !== 4) {
                                setIndex(4)
                              }
                            }}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary data-[focus]:text-white"
                          >
                            Cek Status Surat
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </div>
                </>
              )}
            </Menu>
            </ul>
          </div>
          {user ? (
            <div className='flex items-center'>
              <button onClick={handleSignOut} className='hover:bg-red-500 text-red-500 font-semibold hover:text-white rounded-md border border-red-300 px-6 py-2 duration-200 hidden md:block'>Logout</button>
            </div>
          ): (
            <div className='flex items-center'>
              <button onClick={() => navigate('/login')} className='hover:bg-secondary text-secondary font-semibold hover:text-white rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block'>Login</button>
              <button onClick={() => navigate('/register')} className='hover:bg-secondary text-secondary font-semibold hover:text-white rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block ms-2'>Register</button>
            </div>
          )}
          
          <div className='md:hidden cursor-pointer' onClick={() => setOpen(!open)}>
            <MdMenu className='text-4xl'/>
          </div>
        </div>
      </nav>
      <ResponsiveMenu open={open} user={user}/>

    </>
  )
}

export default Navbar