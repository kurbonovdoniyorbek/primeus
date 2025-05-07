import React from 'react';
import './PageContent.css'; // We'll create this CSS file
import { Truck, Globe, Info } from "lucide-react";
import '../App.css'


const ServicesPage = () => {
    return (
        <div className="page-content">
            <h1 className="page-title">Our Comprehensive Services</h1>
            <p className="page-text">
                We offer a full range of logistics services to meet your transportation needs.
            </p>
            <div className="service-details-grid">
                <div className="service-detail-card">
                    <div className="service-icon"><Truck size={40} /></div>
                    <h3>Full Truckload (FTL)</h3>
                    <p>Dedicated trailers for your large shipments, ensuring direct and efficient delivery.</p>
                </div>
                <div className="service-detail-card">
                    <div className="service-icon"><Truck size={40} /></div>
                    <h3>Less Than Truckload (LTL)</h3>
                    <p>Cost-effective option for smaller freight, consolidating shipments with others.</p>
                </div>
                <div className="service-detail-card">
                    <div className="service-icon"><Truck size={40} /></div>
                    <h3>Expedited Freight</h3>
                    <p>Fast and reliable transport for time-sensitive deliveries.</p>
                </div>
                {/* Add more service details here */}
                <div className="service-detail-card">
                    <div className="service-icon"><Globe size={40} /></div>
                    <h3>Cross-border Shipping</h3>
                    <p>Expertise in navigating customs and regulations for international freight.</p>
                </div>
                <div className="service-detail-card">
                    <div className="service-icon"><Info size={40} /></div>
                    <h3>Logistics Consulting</h3>
                    <p>Partner with our experts to optimize your supply chain and reduce costs.</p>
                </div>
            </div>
        </div>
    );
};

export default ServicesPage;