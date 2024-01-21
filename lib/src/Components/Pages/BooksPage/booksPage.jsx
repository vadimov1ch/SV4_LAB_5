import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Book from '../../Book/book';
import './booksPage.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set()); // Для отслеживания выбранных книг
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);

  const AddBookDialog = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [summary, setSummary] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        id: Date.now(), // Простой способ генерации уникального ID
        title,
        author,
        coverImageUrl,
        summary,
      });
      onClose(); // Закрыть диалог после сохранения
    };

    if (!isOpen) return null;

    return (
      <div className="dialog-backdrop">
        <div className="dialog">
          <form onSubmit={handleSubmit}>
            <label>Название:<input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
            <label>Автор:<input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>
            <label>Обложка URL:<input type="text" value={coverImageUrl} onChange={e => setCoverImageUrl(e.target.value)} /></label>
            <label>Описание:<textarea value={summary} onChange={e => setSummary(e.target.value)} /></label>
            <button type="submit">Сохранить</button>
            <button type="button" onClick={onClose}>Отмена</button>
          </form>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetch('/data/books.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Ошибка загрузки данных о книгах:", error));
  }, []);

  // Функция для обработки выбора/снятия выбора книги
  const toggleSelection = (bookId) => {
    const newSelection = new Set(selectedBooks);
    if (newSelection.has(bookId)) {
      newSelection.delete(bookId);
    } else {
      newSelection.add(bookId);
    }
    setSelectedBooks(newSelection);
  };

  // Функция для удаления выбранных книг
  const deleteSelectedBooks = () => {
    const remainingBooks = books.filter(book => !selectedBooks.has(book.id));
    setBooks(remainingBooks);
    setSelectedBooks(new Set()); // Очистить выбор после удаления
  };

  return (
    <div className="books-page">
      <h1>Список книг</h1>
      <button onClick={() => setIsAddBookDialogOpen(true)}>Добавить книгу</button>
      <button onClick={deleteSelectedBooks} disabled={selectedBooks.size === 0}>
        Удалить выбранные книги
      </button>
      <AddBookDialog
        isOpen={isAddBookDialogOpen}
        onClose={() => setIsAddBookDialogOpen(false)}
        onSave={(newBook) => {
          setBooks([...books, newBook]);
        }}
      />
      <div className="books-list">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <input
              type="checkbox"
              checked={selectedBooks.has(book.id)}
              onChange={() => toggleSelection(book.id)}
            />
            <Link to={`/books/${book.id}`} className="book-link">
              <Book {...book} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
