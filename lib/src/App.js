import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import HomePage from './Components/Pages/HomePage/homePage';
import BooksPage from './Components/Pages/BooksPage/booksPage';
import BookDetailsPage from './Components/Pages/BookDetailsPage/bookDetailsPage';
import './App.css'; // Стили для всего приложения

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/books" element={<BooksPage />} exact />
            <Route path="/books/:bookId" element={<BookDetailsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;