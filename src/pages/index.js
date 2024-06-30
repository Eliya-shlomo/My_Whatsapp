import React from 'react';
import ClientOnly from '../components/ClientOnly';
import Register from '../components/Register';  // or Login or other components needing BrowserRouter

const HomePage = () => {
  return (
    <ClientOnly>
      <Register />
    </ClientOnly>
  );
};

export default HomePage;
