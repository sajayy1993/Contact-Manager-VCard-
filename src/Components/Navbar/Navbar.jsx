import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <>
    <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>

        <div className='container'>
            <Link to={'/'} className="navbar-brand">
            <i className='fa fa-phone text-primary'/> Contact <span className='text-warning'>Manager</span></Link>
        </div>
    </nav>

    </>
  )
}

export default Navbar