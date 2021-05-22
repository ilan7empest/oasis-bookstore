const fs = require('fs');
const mongoose = require('mongoose');
const User = require('../User/user.model');
const Book = require('./book.model');

const HttpError = require('../../helpers/http-error');

const searchByQuery = (query) => {
  const { ...entries } = query;
  const [key] = Object.keys(entries);
  const value = query[key].trim().toLowerCase();
  if (key == 'id') {
    return {
      _id: mongoose.Types.ObjectId(query[key]),
    };
  }
  if (key == 'title') {
    return {
      [key]: { $regex: '^' + value, $options: 'i' },
    };
  }
  return {};
};

module.exports = {
  findAll: async (req, res, next) => {
    try {
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 10,
        populate: {
          path: 'creator',
          select: 'username',
        },
      };
      const books = await Book.paginate({}, options);
      res.status(200).json(books);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  findOne: async (req, res, next) => {
    try {
      const book = await Book.findOne({ _id: req.params.bookId }).populate(
        'creator',
        'username'
      );
      if (!book) {
        return next(new HttpError("Book wasn't found", 404));
        // return res.status(404).json({ err: "Book wasn't found" });
      }
      return res.status(200).json({ book: book });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  create: (req, res, next) => {
    let book;
    let creator;
    let cover = `covers/${req.file.filename}`;
    try {
      Book.validate(req.body)
        .then((validBook) => {
          Book.create(
            Object.assign({}, validBook, {
              creator: req.user.id,
              cover,
            })
          )
            .then(async (Newbook) => {
              book = Newbook;
              const user = await User.findById(req.user.id);
              creator = user;
              user.books.push(book);
              return user.save();
            })
            .then(() => {
              res.status(201).json({
                message: 'Book created successfuly!',
                book,
                username: creator.username,
              });
            })
            .catch((err) => {
              return res.status(500).json(err);
            });
        })
        .catch((err) => {
          return next(new HttpError(err, 400));
          // return res.status(400).json({ error: err });
        });
    } catch (err) {
      console.log(err);
    }
  },
  update: async (req, res, next) => {
    const { bookId } = req.params;
    const validBook = await Book.validate(req.body);
    if (!validBook) {
      return next(new HttpError(err, 404));
      // return res.status(400).json({ error: err });
    }
    await Book.findOneAndUpdate({ _id: bookId }, validBook, {
      new: true,
    })
      .then((book) => {
        if (!book) {
          return next(new HttpError("Book wasn't found", 404));
          // return res.status(400).json({ error: "Book wasn't found" });
        }
        return res.status(201).json({
          message: 'Book Updated',
          book: book,
          // owner: { username: req.user.username },
        });
      })
      .catch((err) => {
        return res.status(500).json({ error: 'Wrong Id' });
      });
  },
  delete: async (req, res, next) => {
    const { bookId } = req.params;
    let book;
    try {
      book = await Book.findById(bookId).populate('creator');
    } catch (err) {
      const error = new HttpError('Somethig went wrong, try again', 500);
      return next(error);
    }
    if (!book) {
      const error = new HttpError('Could not find a book', 404);
      return next(error);
    }
    console.log('book', book);
    console.log('req', req);
    // if (book.creator.id !== req.user) return;
    const imagePath = book.cover;

    try {
      const session = await mongoose.startSession();
      session.startTransaction();
      await book.remove({ session });
      book.creator.books.pull(bookId);
      await book.creator.save({ session });
      await session.commitTransaction();
    } catch (err) {
      const error = new HttpError('Failed to delete a place', 500);
      return next(error);
    }
    fs.unlink(`src/uploads/${imagePath}`, (err) => {
      console.log(err);
    });
    return res.status(200).json({ message: 'Book Deleted' });
  },

  search: async (req, res, next) => {
    try {
      const book = await Book.find(searchByQuery(req.query));
      if (!book) {
        return res.status(404).json({ err: "Book wasn't found" });
      }
      return res.status(200).json(book);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
