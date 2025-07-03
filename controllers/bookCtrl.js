const { v4: uuidv4 } = require("uuid");
const bookModel = require("../models/bookModel");

exports.getBooks = async (req, res) => {
  try {
    const books = await bookModel.getBooks();
    if (!books) return [];
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to get books", error });
  }
};

exports.getBookById = async (req, res) => {
  const bookID = req.params.id;
  //   console.log("book id", bookID);
  try {
    const books = await bookModel.getBooks();
    const book = books.find((e) => e.id === bookID);
    if (!book) {
      return res.status(400).json({ message: "Book not found for this ID" });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to get book by id", error });
  }
};

exports.addBooks = async (req, res) => {
  console.log("body", req.body);
  try {
    const userId = req.user.id;
    if (!userId) {
      return res
        .status(400)
        .json({ message: "user not found! Please Create account" });
    }

    const { title, author, genre, publishedYear } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required " });
    }
    if (!author) {
      return res.status(400).json({ message: "author is required " });
    }

    const existingBooks = await bookModel.getBooks();
    const newBook = {
      id: uuidv4(),
      title,
      author,
      genre,
      publishedYear,
      userId,
    };
    existingBooks.push(newBook);
    await bookModel.add_update_Book(existingBooks);
    res.status(201).json({ message: "Book add successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.deleteBook = async (req, res) => {
  const bookID = req.params.id;
  const userId = req.user.id;
  //   console.log("delete book id", bookID);
  //   console.log("user id", userId);
  try {
    const books = await bookModel.getBooks();
    const book = books.find((e) => e.id === bookID);
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    // console.log(book);

    if (book.userId !== userId) {
      return res.status(403).json({
        error:
          "You do not own this book, so you are not authorized to delete it.",
      });
    }
    const afterDeleteBooks = books.filter((b) => b.id !== req.params.id);
    await bookModel.add_update_Book(afterDeleteBooks);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};

exports.updateBookById = async (req, res) => {
  const bookID = req.params.id;
  const updateBodyData = req.body;
  const userId = req.user.id;
  //   console.log("delete book id", bookID);
  // console.log("user id", userId);

  try {
    const books = await bookModel.getBooks();
    const bookIndex = books.findIndex((e) => e.id === bookID);
    // console.log("books", books);
    // console.log("bookIndex", bookIndex);
    if (bookIndex === -1) {
      return res.status(404).json({ error: "Book not found" });
    }

    if (books[bookIndex].userId !== userId) {
      return res.status(403).json({
        error:
          "You do not own this book, so you are not authorized to update it.",
      });
    }

    books[bookIndex] = {
      ...books[bookIndex],
      ...updateBodyData,
    };

    await bookModel.add_update_Book(books);
    res.status(200).json({ message: "Book Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
    console.error(error);
  }
};
