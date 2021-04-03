const mongoose = require('mongoose');
const urlRegex = require('../utils/url').regex;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Поле `name` является обязательным'],
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Поле `about` является обязательным'],
    },
    avatar: {
      type: String,
      validate: {
        validator: (link) => urlRegex.test(link),
        message: (link) => `Ссылка ${link.value} имеет неверный формат`,
      },
      required: [true, 'Поле `avatar` является обязательным'],
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);
