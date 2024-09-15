import { NavbarMenu } from '../../data'
import { FaSearch } from "react-icons/fa"
import { FaDumbbell } from "react-icons/fa6"
import { MdMenu } from "react-icons/md"
import { FaShoppingCart } from "react-icons/fa"
import imgLogo from '../../assets/images/logo-website.jpeg'
import { useState } from 'react'
import ResponsiveMenu from './ResponsiveMenu'


const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <nav className='bg-primary'>
        <div className="container flex justify-between items-center py-3">
          <div className='text-2xl font-bold flex items-center gap-2'>
            <img src={imgLogo} className='img-logo' alt='...'></img>
            <p className='text-white'>Website RT</p>
          </div>
          <div className='hidden md:block'>
            <ul className='flex items-center gap-6 text-white'>
              {
                NavbarMenu.map((item) => {
                  return (
                    <li key={item.id}>
                      <a href={item.link} className='inline-block py-1 px-3 hover:text-secondary font-semibold'>{item.title}</a>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className='flex items-center'>
            <button className='hover:bg-secondary text-secondary font-semibold hover:text-white rounded-md border border-secondary px-6 py-2 duration-200 hidden md:block'>Login</button>
          </div>
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