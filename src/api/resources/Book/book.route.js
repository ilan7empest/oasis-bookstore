const router = require('express').Router();
const passport = require('passport');

const fileUpload = require('../../middleware/file-upload');

const bookController = require('./book.controller');

router.get('/:bookId', bookController.findOne);
router.post('/search', bookController.search);

router.use(passport.authenticate('jwt', { session: false }));

router
  .route('/')
  .get(bookController.findAll)
  .post(fileUpload.single('cover'), bookController.create);

router
  .route('/:bookId')
  .patch(bookController.update)
  .delete(bookController.delete);

module.exports = router;
