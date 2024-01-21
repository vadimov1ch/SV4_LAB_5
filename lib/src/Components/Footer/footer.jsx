import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <section className="about">
                    <h3>О нас</h3>
                    <p>MyLibrary - ваш персональный помощник в управлении книжной коллекцией.</p>
                </section>
                <section className="contacts">
                    <h3>Контакты</h3>
                    <p>Email: info@mylibrary.com</p>
                    <p>Телефон: +1234567890</p>
                </section>
                <section className="social-networks">
                    <h3>Социальные сети</h3>
                    <p>Следите за нами в соцсетях.</p>
                    <ul>
                        <li><a href="https://facebook.com">Facebook</a></li>
                        <li><a href="https://twitter.com">Twitter</a></li>
                        <li><a href="https://instagram.com">Instagram</a></li>
                    </ul>
                </section>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 MyLibrary. Все права защищены.</p>
            </div>
        </footer>
    );
};

export default Footer;