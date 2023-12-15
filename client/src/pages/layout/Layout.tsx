import React from 'react';
import Navbar from './NavBar';

interface ILayoutProps {
  children: React.ReactNode;
  isAuthorized: boolean;
}

const Layout: React.FC<ILayoutProps> = ({ children, isAuthorized }) => {
  return (
    <div>
      <Navbar isAuthorized={isAuthorized} />
      <div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
