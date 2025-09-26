import React from 'react';
import Menubar from '../components/Menubar';
import './ReportPage.css';

const ReportPage = () => {
    return (
        <div className="report-page">
            <Menubar />
            <div className="report-container">
                <h1>Reports Dashboard</h1>
                <div className="report-frame">
                    <iframe 
                        title="eastman" 
                        width="600" 
                        height="373.5" 
                        src="https://app.powerbi.com/view?r=eyJrIjoiZGJhMjZmMTItMmU5ZS00YzM0LTg0YjQtNzBmZDNlNGQwZmY4IiwidCI6IjRhOWE0NjA2LWUxODktNDQxOS05NjUzLTc4OTkwNTgyMjMyMiJ9" 
                        frameBorder="0" 
                        allowFullScreen={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReportPage;