/**
* Importing node modules
*/
import express from 'express';
const router = express.Router();

router.get("/search", (req, res) => {
  res.json({
    books: [
      {
        goodreadsId: 1,
        title: "1984",
        authors: "Orwell",
        covers: [
          "https://images.grpassets.com/books/13489905661/5470.jpg"
        ],
        pages: 198
      },
      {
        goodreadsId: 2,
        title: "The man",
        authors: "The man in a Boat",
        covers: [
          "https://images.grpassets.com/books/13489905661/5470.jpg"
        ],
        pages: 200
      }
    ]
  });
});

export default router;
