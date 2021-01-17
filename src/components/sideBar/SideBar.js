import React from 'react';
import { NavLink } from 'react-router-dom';
import {PaletteIcon,NineGridIcon} from '../icons/Icons';
const SideBar = () => {
  return (
    <ul className="sidebar-div">
      <div className="sidbar-title">KATY DEMO</div>
       <li className="menu-item">
          <NavLink to="/" activeClassName="active" >   
            <PaletteIcon/> canvas 畫板
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/nineGrid" activeClassName="active" >   
            <NineGridIcon/> 九宮格
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/reactdnd" activeClassName="active" >   
            <NineGridIcon/> React dnd
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/konva_demo" activeClassName="active" >   
            <NineGridIcon/> konva demo1
          </NavLink>
        </li>
    </ul>
  );
};

export default SideBar;
