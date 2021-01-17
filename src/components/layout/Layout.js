import React from 'react';
import SideBar from '../sideBar/SideBar'
const Layout = ({children}) => {
  
  return (
    <div className="layout-div">
      <div className="left-div">
        <SideBar/>
      </div>
      <div className="right-div">
        {children}
      </div>
    </div>
  );
};

export default Layout;