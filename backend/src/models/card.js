const mongoose = require('mongoose');
const regex = require('../utils/regex');
const errors = require('../utils/errors');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, errors.name.required],
    },
    link: {
      type: String,
      validate: {
        validator: (link) => regex.url.test(link),
        message: errors.link.invalid,
      },
      required: [true, errors.link.required],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, errors.owner.required],
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
