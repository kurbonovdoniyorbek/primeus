import React from 'react';
import './PageContent.css'; // We'll create this CSS file
import '../App.css'


const TrackingPage = () => {
    return (
        <div className="page-content">
            <h1 className="page-title">Track Your Shipment</h1>
            <p className="page-text">
                Enter your tracking number below to get the latest updates on your shipment's status and location.
            </p>
            {/* Add a tracking form or integration here */}
            <div className="tracking-form">
                <input type="text" placeholder="Enter Tracking Number" className="tracking-input" />
                <button className="tracking-button">Track</button>
            </div>
        </div>
    );
};

export default TrackingPage;