import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Book from '../../Book/book';
import './booksPage.css';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch('/data/books.json')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error("Ошибка загрузки данных о книгах:", error));
  }, []);

  const toggleSelection = (bookId) => {
    const newSelection = new Set(selectedBooks);
    if (newSelection.has(bookId)) {
      newSelection.delete(bookId);
    } else {
      newSelection.add(bookId);
    }
    setSelectedBooks(newSelection);
  };

  const deleteSelectedBooks = () => {
    setBooks(books.filter(book => !selectedBooks.has(book.id)));
    setSelectedBooks(new Set());
  };

  const handleSaveBook = (book) => {
    if (editingBook) {
      setBooks(books.map(b => b.id === book.id ? book : b));
    } else {
      setBooks([...books, { ...book, id: Date.now() }]);
    }
    setIsDialogOpen(false);
    setEditingBook(null);
  };

  const AddBookDialog = ({ isOpen, onClose, onSave, book }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [coverImageUrl, setCoverImageUrl] = useState('');
    const [summary, setSummary] = useState('');

    useEffect(() => {
      if (book) {
        setTitle(book.title);
        setAuthor(book.author);
        setCoverImageUrl(book.coverImageUrl);
        setSummary(book.summary);
      } else {
        setTitle('');
        setAuthor('');
        setCoverImageUrl('');
        setSummary('');
      }
    }, [book]);

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        id: book ? book.id : Date.now(),
        title,
        author,
        coverImageUrl,
        summary,
      });
      onClose();
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

  return (
    <div className="books-page">
      <h1>Список книг</h1>
      <button onClick={() => { setIsDialogOpen(true); setEditingBook(null); }}>Добавить книгу</button>
      <button onClick={deleteSelectedBooks} disabled={selectedBooks.size === 0}>Удалить выбранные книги</button>
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
            <button onClick={() => { setIsDialogOpen(true); setEditingBook(book); }}>Редактировать</button>
          </div>
        ))}
      </div>
      <AddBookDialog
        isOpen={isDialogOpen}
        onClose={() => { setIsDialogOpen(false); setEditingBook(null); }}
        onSave={handleSaveBook}
        book={editingBook}
      />
    </div>
  );
};

export default BooksPage;