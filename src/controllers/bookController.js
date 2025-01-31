const db = require("../config/db");

exports.getAllBooks = (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getBookById = (req, res) => {
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Book not found" });
    res.json(results[0]);
  });
};

exports.addBook = (req, res) => {
  const { title, author, description } = req.body;
  if (!title || !author || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.query(
    "INSERT INTO books (title, author, description) VALUES (?, ?, ?)",
    [title, author, description],
    (err, result) => {
      if (err) {
        console.error("Database insertion error:", err);
        res
          .status(500)
          .json({ error: "Database insertion failed", details: err });
      } else {
        res
          .status(201)
          .json({ message: "Book added successfully", id: result.insertId });
      }
    }
  );
};

exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, description } = req.body;
  if (!title || !author || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }
  db.query(
    "UPDATE books SET title = ?, author = ?, description = ? WHERE id = ?",
    [title, author, description, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Database update failed" });
      } else if (result.affectedRows === 0) {
        res.status(404).json({ error: "Book not found" });
      } else {
        res.json({ message: "Book updated successfully" });
      }
    }
  );
};

exports.deleteBook = (req, res) => {
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  });
};

exports.searchBooks = (req, res) => {
  const { q } = req.query;
  const query = "SELECT * FROM books WHERE title LIKE ? OR author LIKE ?";
  db.query(query, [`%${q}%`, `%${q}%`], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
