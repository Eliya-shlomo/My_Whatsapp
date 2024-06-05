// components/NavBar.js
import React from 'react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear stored authentication tokens
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');

    // Redirect to login page
    router.push('/login');
  };

  return (
    <div className="navbar">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
