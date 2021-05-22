const mongoose = require('mongoose');
const db = mongoose.connection;

require('dotenv').config();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));

db.on('error', () => console.error.bind(console, 'connection error'));

db.once('open', () => {
  const app = require('../app');
  app.listen(PORT, () => console.log(`Server open on port ${PORT}`));
});
