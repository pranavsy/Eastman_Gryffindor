import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { supabase } from '../supabaseClient';
import './Menubar.css';

const Menubar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <nav className="menubar">
            <div className="left-menu">
                <Link to="/tickets">Tickets</Link>
                <Link to="/reports">Reports</Link>
            </div>
            <div className="right-menu">
                <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </div>
        </nav>
    );
};

export default Menubar;