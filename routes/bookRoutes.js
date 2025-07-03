const express = require("express");
const bookCtrl = require("../controllers/bookCtrl");
const authMiddlewares = require("../middlewares/authMiddleware");
const router = express.Router();
router.use(authMiddlewares);

router.get("/search", bookCtrl.getBooksByGenre);
router.get("/", bookCtrl.getBooks);
router.get("/:id", bookCtrl.getBookById);
router.post("/", bookCtrl.addBooks);
router.delete("/:id", bookCtrl.deleteBook);
router.put("/:id", bookCtrl.updateBookById);

module.exports = router;
