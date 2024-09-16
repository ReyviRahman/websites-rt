import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import imgControl from '../../assets/images/control.png'
import imgAdmin from '../../assets/images/shield_person.png'
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../config/firestore'
import Sidebar from '../Sidebar/Sidebar';
import { MdAdminPanelSettings } from 'react-icons/md';
import { FaArrowAltCircleLeft } from "react-icons/fa";

const DashboardAdmin = () => {
  const [open, setOpen] = useState(true);
  const [clickedIndex, setClickedIndex] = useState(false);
  const Menus = [
    { title: "Dashboard", src: "Chart_fill" },
    { title: "Inbox", src: "Chat" },
    { title: "Accounts", src: "User", gap: true },
    { title: "Schedule ", src: "Calendar" },
    { title: "Search", src: "Search" },
    { title: "Analytics", src: "Chart" },
    { title: "Files ", src: "Folder", gap: true },
    { title: "Setting", src: "Setting" },
  ];

  const handleClick = (index) => {
    setClickedIndex(index === clickedIndex ? null : index); // Toggle item yang diklik
  };

  const marginTop = {
    marginTop: '50px'
  };

  return (
    <div className="flex" style={marginTop}>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-primary h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={imgControl}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-primary
           border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="text-3xl flex gap-x-4 items-center">
          <img
            src={imgAdmin}
            alt=""
            width={40}
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Dashboard Admin
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
            onClick={() => handleClick(index)}
              key={index}
              className={`${
                clickedIndex === index ? 'bg-secondary font-bold text-white' : 'font-semibold'
              } flex rounded-md p-2 cursor-pointer  text-gray-300 hover:bg-secondary hover:text-white text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <img src={Menu.src} />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-screen flex-1 p-7">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
      </div>
    </div>
  );
};

export default DashboardAdmin;
