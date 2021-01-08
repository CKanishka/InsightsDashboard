import React from "react";
import logo from '../static/images/dashboard.png'

const Navbar = () => {
  
  return (
    <div>
        <nav className="navbar navbar-light navbar-custom">
            <a class="navbar-brand" href="/">
                <img src={logo} height="40" alt=""/>
            </a>
        </nav>
    </div>                                     
  );
};

export default Navbar;
