import React from 'react';
import './book.css';

const Book = ({ title, author, coverImageUrl, summary }) => {
    return (
        <div className="book">
            <img src={coverImageUrl} alt={`Обложка книги ${title}`} className="book-cover" />
            <div className="book-info">
                <h2 className="book-title">{title}</h2>
                <p className="book-author">{author}</p>
                <p className="book-summary">{summary}</p>
            </div>
        </div>
    );
};

export default Book;