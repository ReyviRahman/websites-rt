import { NavbarMenu, NavbarMenuAdmin } from '../../data'
import { MdMenu } from "react-icons/md"
import imgLogo from '../../assets/images/logo-website.jpeg'
import { useState } from 'react'
import ResponsiveMenu from './ResponsiveMenu'
import { useNavigate } from 'react-router-dom'
import { signOut, getAuth } from 'firebase/auth'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

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
                        <a onClick={() => {navigate(item.link)}} className='cursor-pointer inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
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
                        <a onClick={() => {navigate(item.link)}} className='cursor-pointer inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                      </li>
                    )
                  })
                }
              </>
              
            )}
            <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-primary px-3 py-2 text-sm font-bold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-secondary">
          Layanan
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              onClick={() => {navigate('/suratpengantar')}}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary data-[focus]:text-white"
            >
              Surat Pengantar
            </a>
          </MenuItem>
          <MenuItem>
            <a
              onClick={() => {navigate('/statussurat')}}
              className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-primary data-[focus]:text-white"
            >
              Cek Status Surat
            </a>
          </MenuItem>
        </div>
      </MenuItems>
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