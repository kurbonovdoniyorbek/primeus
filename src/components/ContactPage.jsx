import React from 'react';
import './PageContent.css'; // We'll create this CSS file
import { Phone, Mail, Truck } from "lucide-react";
import '../App.css'


const ContactPage = () => {
    return (
        <div className="page-content">
            <h1 className="page-title">Get in Touch</h1>
            <p className="page-text">
                We're here to answer your questions and discuss your logistics needs. Reach out to us via phone, email, or visit our office.
            </p>
            <div className="contact-details-layout">
                <div className="contact-item">
                    <Phone size={30} />
                    <p>(123) 456-7890</p>
                </div>
                <div className="contact-item">
                    <Mail size={30} />
                    <p>safetyprimeus@gmail.com</p>
                </div>
                <div className="contact-item">
                    <Truck size={30} />
                    <p>Plainfield IL</p>
                </div>
                {/* Add map embed or contact form here */}
            </div>
        </div>
    );
};

export default ContactPage;