const db = require('../config/db');

exports.getAllBooks = (req, res) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getBookById = (req, res) => {
    const query = 'SELECT * FROM books WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Book not found' });
        res.json(results[0]);
    });
};

exports.addBook = (req, res) => {
    const { title, author, description } = req.body;
    const query = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)';
    db.query(query, [title, author, description], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Book added', bookId: results.insertId });
    });
};

exports.updateBook = (req, res) => {
    const { title, author, description } = req.body;
    const query = 'UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?';
    db.query(query, [title, author, description, req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book updated' });
    });
};

exports.deleteBook = (req, res) => {
    const query = 'DELETE FROM books WHERE id = ?';
    db.query(query, [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Book not found' });
        res.json({ message: 'Book deleted' });
    });
};

exports.searchBooks = (req, res) => {
    const { q } = req.query;
    const query = 'SELECT * FROM books WHERE title LIKE ? OR author LIKE ?';
    db.query(query, [`%${q}%`, `%${q}%`], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};