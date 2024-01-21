import React from 'react';
import { Link } from 'react-router-dom'; // Используем Link для навигации
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyLibrary</Link>
            </div>
            <nav className="navigation">
                <ul>
                    <li><Link to="/">Главная</Link></li>
                    <li><Link to="/books">Книги</Link></li>
                    <li><Link to="/contacts">Контакты</Link></li>
                </ul>
            </nav>
            <div className="profile">
                <Link to="/profile">Профиль</Link>
            </div>
        </header>
    );
};

export default Header;