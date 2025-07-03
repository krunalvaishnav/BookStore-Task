const fs = require("fs").promises;

exports.getBooks = async () => {
  try {
    const books = await fs.readFile("./json/books.json", "utf8");
    return JSON.parse(books);
  } catch (error) {
    return [];
  }
};

exports.add_update_Book = async (newBook) => {
  try {
    await fs.writeFile("./json/books.json", JSON.stringify(newBook, null, 2));
  } catch (err) {
    console.error("Error adding book:", err);
  }
};
