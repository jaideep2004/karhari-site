'use client';

import { useNavbar } from './hooks/useNavbar';

export default function Navbar() {
  useNavbar();

  return (
    <nav className="navbar">
      <div className="nav-container"><a href="#" className="nav-logo"><img src="karhari-media-b1.png" alt="Karhari Media" className="nav-logo-img" /></a><ul className="nav-links" id="navLinks"><li><a href="#" className="active">HOME</a></li><li><a href="#">SERVICES</a></li><li><a href="#">ABOUT US</a></li><li><a href="#">CONTACT</a></li></ul><div className="nav-actions"><a href="#" className="nav-login">LOGIN</a><a href="#" className="nav-cta">SIGN UP</a></div><button className="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button></div>
    </nav>
  );
}
