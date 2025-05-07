import React, { useState } from 'react';
import './PageContent.css'; // We'll create this CSS file
import '../App.css'

const QuotePage = () => {
    // State and handlers for the form, similar to your App.js
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        shipmentDetails: '',
        additionalMessage: ''
    });

    const BACKEND_ENDPOINT = '/api/submit-quote'; // <<< REPLACE THIS WITH YOUR BACKEND URL

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError(null);
        setSuccess(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(BACKEND_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                let errorMessage = `HTTP error! status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || errorData.error || errorMessage;
                } catch (e) {
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('Success:', result);
            setSuccess(true);

            setFormData({
                name: '',
                email: '',
                company: '',
                shipmentDetails: '',
                additionalMessage: ''
            });

        } catch (error) {
            console.error('Submission error:', error);
            setError(`An error occurred: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="page-content">
            <h1 className="page-title">Get a Free Quote</h1>
            <p className="page-text">
                Tell us about your shipment needs, and we'll provide a competitive quote tailored to your requirements.
            </p>
            <div className="quote-form-container page-form"> {/* Use page-form class for specific styling */}
                <form className="form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder="Company Name"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <input
                        type="text"
                        placeholder="Shipment Details (Origin, Destination, Type)"
                        name="shipmentDetails"
                        value={formData.shipmentDetails}
                        onChange={handleInputChange}
                        required
                        disabled={loading}
                    />
                    <textarea
                        placeholder="Additional Message / Details"
                        rows="6" // More rows for a dedicated page form
                        name="additionalMessage"
                        value={formData.additionalMessage}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Request'}
                    </button>

                    {success && <p style={{ color: 'green' }}>Quote request sent successfully! We will contact you shortly.</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                </form>
            </div>
        </div>
    );
};

export default QuotePage;