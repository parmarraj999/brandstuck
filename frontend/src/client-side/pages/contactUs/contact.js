import React from 'react';
import './contact.css';

const ContactPage = () => {

    const phoneNumber = '7974542309'; // Replace with your number


    const message = 'Hello, I would like to know more about your services.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/91${phoneNumber}?text=hii`;

    const openWhatsApp = () => {
        window.open(whatsappLink, '_blank');
    };


    return (
        <div className="contact-container">

            <main className="main-content">
                <div className="contact-info">
                    <h2 className="contact-title">Contact us</h2>
                    <h2 className="contact-by">"BrandStuck by Manav Lunawat"</h2>
                    <p className="contact-subtitle">
                        Get in touch with us for any enquiries<br />
                        and questions
                    </p>

                    <div className="contact-details">
                        <div className="contact-section">
                            <h3>general inquiries</h3>
                            <p>brandstuck1@gmail.com</p>
                            <p>+91 7479542309</p>
                        </div>

                        <div className="contact-section">
                            <h3>address</h3>
                            <p>Front of Domino's, main road, narsinghpur, madhya pradesh 487001</p>
                        </div>
                    </div>

                    <div className="social-links">
                        <a href="https://www.instagram.com/brand_stuck/" className="social-link">Instagram</a>
                        <a onClick={openWhatsApp} className="social-link">Whatsapp</a>
                    </div>
                </div>

                <div className="image-section">
                    <div className="bedroom-image">
                        <img
                            src="../../../../assets/images/store.jpg"
                            alt="Modern bedroom interior"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;