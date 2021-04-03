const mongoose = require('mongoose');
const urlRegex = require('../utils/url').regex;

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Поле `name` является обязательным'],
    },
    link: {
      type: String,
      validate: {
        validator: (link) => urlRegex.test(link),
        message: (link) => `Ссылка ${link.value} имеет неверный формат`,
      },
      required: [true, 'Поле `link` является обязательным'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: [true, 'Поле `owner` является обязательным'],
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
