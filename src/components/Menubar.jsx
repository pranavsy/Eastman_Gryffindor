import React from 'react';
import { Link } from 'react-router-dom';
import './Menubar.css';

const Menubar = () => {
    return (
        <nav className="menubar">
            <div className="left-menu">
                <Link to="/">Tickets</Link>
                <Link to="/tickets">Reports</Link>
            </div>
        </nav>
    );
};

export default Menubar;