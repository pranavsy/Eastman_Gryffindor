import React from 'react';
import Menubar from '../components/Menubar';
import './TicketsPage.css';

const TicketsPage = () => {
    return (
        <div className="tickets-page">
            <Menubar />
            <div className="tickets-container">
                <h1>Tickets</h1>
            </div>
        </div>
    );
};

export default TicketsPage;