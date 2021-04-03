const mongoose = require('mongoose');
const defaults = require('../utils/defaults');
const errors = require('../utils/errors');
const regex = require('../utils/regex');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      validate: {
        validator: (email) => regex.email.test(email),
        message: errors.email.invalid,
      },
      required: [true, errors.email.required],
    },
    password: {
      type: String,
      required: [true, errors.password.required],
    },
    name: {
      type: String,
      minlength: [2, errors.name.minlength],
      maxlength: [30, errors.name.maxlength],
      default: defaults.name,
    },
    about: {
      type: String,
      minlength: [2, errors.about.minlength],
      maxlength: [30, errors.about.maxlength],
      default: defaults.about,
    },
    avatar: {
      type: String,
      validate: {
        validator: (url) => regex.url.test(url),
        message: errors.avatar.invalid,
      },
      default: defaults.avatar,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
