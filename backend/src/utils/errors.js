module.exports.errors = {
  email: {
    required: 'Поле "email" является обязательным',
    invalid: 'Email имеет неверный формат',
  },
  password: {
    required: 'Поле "password" является обязательным',
  },
  name: {
    required: 'Поле  является обязательным',
    minlength: 'Имя должно содержать не менее 2 символов',
    maxlength: 'Имя должно содержать не более 30 символов',
  },
  about: {
    minlength: 'Поле "about" должно содержать не менее 2 символов',
    maxlength: 'Поле "about" должно содержать не более 30 символов',
  },
  avatar: {
    invalid: 'Ссылка имеет неверный формат',
  },
  link: {
    invalid: 'Ссылка имеет неверный формат',
    required: 'Поле "link" является обязательным',
  },
  owner: {
    required: 'Поле "owner" является обязательным',
  },
};
