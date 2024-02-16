import React from 'react';
import {NavLink} from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand">HW-65</span>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pages/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pages/contacts">Contacts</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/pages/admin">Admin</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;