import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/work">Work</a></li>
          <li><a href="/connect">Connect</a></li>
          <li><a href="/store">Store</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
