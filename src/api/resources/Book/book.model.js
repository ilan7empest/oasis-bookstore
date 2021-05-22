const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const Joi = require('joi');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      default: '',
      required: [true, 'Book must have a title'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
      required: [true, 'Book must have a description'],
    },
    price: { type: Number, default: 0, min: 0 },
    cover: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

bookSchema.statics.validate = (body) => {
  return new Promise((resolve, reject) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0),
    });
    const { value, error } = schema.validate(body);
    if (error && error.details) {
      reject(error.details[0].message);
    } else {
      resolve(value);
    }
  });
};

bookSchema.plugin(mongoosePaginate);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
