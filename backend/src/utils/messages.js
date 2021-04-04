module.exports.validation = {
  email: {
    unique: 'Пользователь с таким email уже существует',
    required: 'Поле \'email\' является обязательным',
    minlength: 'Email должнен содержать не менее 3 символов',
    maxlength: 'Email должнен содержать не более 320 символов',
    invalid: 'Email имеет неверный формат',
  },
  password: {
    minlength: 'Пароль должнен содержать не менее 6 символов',
    required: 'Поле \'password\' является обязательным',
  },
  name: {
    required: 'Поле  является обязательным',
    minlength: 'Имя должно содержать не менее 2 символов',
    maxlength: 'Имя должно содержать не более 30 символов',
  },
  about: {
    minlength: 'Поле \'about\' должно содержать не менее 2 символов',
    maxlength: 'Поле \'about\' должно содержать не более 30 символов',
  },
  avatar: {
    invalid: 'Ссылка имеет неверный формат',
  },
  link: {
    invalid: 'Ссылка имеет неверный формат',
    required: 'Поле \'link\' является обязательным',
  },
  owner: {
    required: 'Поле \'owner\' является обязательным',
  },
};

module.exports.http = {
  badRequest: {
    message: 'Введены некорректные данные',
    params: {
      _id: 'Введен невалидный _id',
    },
  },
  unauthorized: {
    message: 'Необходима авторизация',
  },
  forbidden: {
    card: 'Нельзя удалить чужую карточку',
  },
  notFound: {
    message: 'Запрашиваемый ресурс не найден',
    format: (src) => `${src} не существует`,
  },
  conflict: {
    message: 'Указанные данные уже существуют',
    format: (entries) => {
      const prefix = Object.keys(entries).join(', ');
      const postfix = entries.length > 1 ? 'существуют' : 'существует';
      return `${prefix} уже ${postfix}`;
    },
  },
};
