const userRoute = require('./resources/User/user.route');
const bookRoute = require('./resources/Book/book.route');
const restRouter = require('express').Router();

restRouter.use('/users', userRoute);
restRouter.use('/books', bookRoute);

module.exports = restRouter;
