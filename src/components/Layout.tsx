import React from 'react';
import Navigation from './Auth/Navigation'; 
import Footer from './Auth/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation /> 
      <div>{children}</div> 
      <Footer />
    </>
  );
};

export default Layout;
