// components/NavBar.js
import React from 'react';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  };

  return (
    <div className="navbar">
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
