import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  const margin = 'm-5';
  return (
    <>
      <nav className="bg-blue-700 ">
        <ul className="flex flex-row justify-center py-5 text-white">
          <li>
            <Link to="/" className={margin}>Top Anime</Link>
          </li>
          <li>
            <Link to="/list" className={margin}>Rekomendasi Anime</Link>
          </li>
        
        </ul>
      </nav>

      <div className='bg-slate-100'>
        <div className="container mx-auto bg-white p-2">
          <Outlet />
        </div>
      </div>

    </>
  )
}

export default Layout