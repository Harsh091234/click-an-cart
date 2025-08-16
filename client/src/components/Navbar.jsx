import React, { useEffect, useState } from 'react'
import {House, LogOut, ShoppingCart, Lock, AlignJustify, X, Sun} from "lucide-react"
import {useThemeStore} from "../store/useThemeStore"
import  {Link} from "react-router-dom"

const Navbar = () => {
  const {setTheme}  = useThemeStore();
  const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [open, setOpen] = useState(false);


  useEffect(() => {
    if (isDarkTheme) {
      setTheme("dark");
    
    } else {
      setTheme("light");
     
    }
  }, [isDarkTheme, setTheme]);

  return (
    <div className=" flex justify-between items-center bg-base-100 shadow-lg px-5 py-3 border-b-base-300 border-b">
  <div className="">

    <h1 className=" text-xl opacity-70 font-bold">Click-an-Cart !!</h1>
  </div>
 

    {/* tabs */}
  <div className='flex'>
    
    
    {/* for mobile */}
<div className="sm:hidden flex items-center justify-between ">
      {/* Dark mode toggle */}
      <button
        onClick={() => setIsDarkTheme(!isDarkTheme)}
        className="btn btn-ghost btn-square border-0 hover:bg-base-300 hover:opacity-90"
      >
        <Sun className="opacity-80 h-5 w-5" />
      </button>

      {/* Menu button */}
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost btn-square border-0 hover:bg-base-300 hover:opacity-90"
      >
        <AlignJustify className="opacity-80 h-5 w-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sliding panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-base-200 text-base-content z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="btn btn-ghost btn-square absolute top-4 right-4"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Nav links */}
        <ul className="mt-16 space-y-2 p-4">
          <li>
            <Link to="/" className="flex items-center gap-2 btn btn-ghost justify-start border-0 hover:bg-base-300 opacity-80 hover:opacity-90">
              <House className="h-5 w-5" /> Home
            </Link>
          </li>
          <li>
            <Link to=" /cart" className="flex items-center gap-2 btn btn-ghost justify-start border-0 hover:bg-base-300 opacity-80 hover:opacity-90">
              <ShoppingCart className="h-5 w-5" /> Cart
            </Link>
          </li>
          <li>
            <Link to="/dashboard "className="flex items-center gap-2 btn btn-ghost justify-start border-0 hover:bg-base-300 opacity-80 hover:opacity-90">
              <Lock className="h-5 w-5" /> Dashboard
            </Link>
          </li>
          <li>
            <button  className="flex w-full items-center gap-2 btn btn-ghost justify-start border-0 hover:bg-base-300 opacity-80 hover:opacity-90">
              <LogOut className="h-5 w-5" /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>

 

  {/* for desktop */}
  <div className=" hidden sm:flex sm:gap-2 items-center">
    <ul className="flex">
  <li>
    <Link to="" className="opacity-70 hover:opacity-80 btn btn-ghost border-0 hover:bg-base-300 ">
      <House className="h-5 w-5" />
      <span className="hidden md:inline">Home</span>
    </Link>
  </li>
  <li>
    <Link to="" className="opacity-70 hover:opacity-80 btn btn-ghost border-0 hover:bg-base-300">
      <ShoppingCart className="h-5 w-5 " />
      <span className="hidden md:inline">Cart</span>
    </Link>
  </li>
  <li>
    <Link  to=""  className="opacity-70 hover:opacity-80 btn btn-ghost border-0 hover:bg-base-300 ">
      <Lock className="h-5 w-5  " />
      <span className="hidden md:inline">Dashboard</span>
    </Link>
  </li>
  <li onClick={() => setIsDarkTheme(!isDarkTheme)}>
    <button className="btn btn-ghost btn-square border-0 opacity-70 hover:opacity-80 hover:bg-base-300 ">
      <Sun className="h-5 w-5" />
    </button>
  </li>
</ul>

<button className={`opacity-70 hover:opacity-80 btn border border-neutral/15  gap-2 ${isDarkTheme? "hover:bg-neutral/60 bg-neutral/40": "hover:bg-neutral/25 bg-neutral/15 " }`}>
  <LogOut className=" h-5 w-5" />
  <span className="hidden md:inline">Logout</span>
</button>

  </div>
 
  </div>
</div>
  )
}

export default Navbar