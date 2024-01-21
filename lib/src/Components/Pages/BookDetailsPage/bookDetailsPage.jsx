import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './booksDetailsPage.css'; // Стили для этой страницы

const BookDetailsPage = () => {
  const { bookId } = useParams(); // Получаем ID книги из URL
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Загружаем данные книги. В реальном приложении здесь может быть запрос к API.
    fetch(`/data/books.json`) // Пример загрузки данных из локального файла
      .then(response => response.json())
      .then(data => {
        const bookData = data.find(book => book.id === parseInt(bookId));
        setBook(bookData);
      })
      .catch(error => console.log("Ошибка загрузки данных книги:", error));
  }, [bookId]);

  if (!book) return <div>Загрузка данных книги...</div>;

  return (
    <div className="book-details">
      <h1>{book.title}</h1>
      <div className="details-container">
        <img src={book.coverImageUrl} alt={`Обложка книги ${book.title}`} />
        <div className="book-info">
          <p><strong>Автор:</strong> {book.author}</p>
          <p>{book.summary}</p>
          <Link to="/books">Вернуться к списку книг</Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
