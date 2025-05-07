import React from 'react';
import './PageContent.css'; // We'll create this CSS file
import '../App.css'


const AboutPage = () => {
    return (
        <div className="page-content">
            <h1 className="page-title">About Prime Us Inc Carrier</h1>
            <p className="page-text">
                Founded in [Year], Prime Us Inc Carrier has grown to become a trusted name in the freight transportation industry. We are committed to providing reliable, efficient, and safe logistics solutions for businesses of all sizes. Our team of experienced professionals is dedicated to exceeding your expectations and building long-term partnerships.
            </p>
            <p className="page-text">
                Learn more about our mission, values, and the team that drives our success.
            </p>
            {/* Add more specific About Us content here */}
        </div>
    );
};

export default AboutPage;