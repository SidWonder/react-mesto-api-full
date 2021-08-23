const User = require('../models/users');
const NotFoundError = require('../errors/not-found-err');
const DefaultError = require('../errors/default-err');
const UncorectDataError = require('../errors/uncorect-data-err');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new DefaultError('Произошла ошибка');
      }
      res.send({ users });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Такого пользователя нет в базе');
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Такого пользователя нет в базе'));
      }
      if (err.name === 'CastError') {
        next(new UncorectDataError('Такого пользователя несуществует, проверьте ID пользователя'));
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  console.log(req.user._id);
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Такой карточки нет в базе'));
      }
      if (err.name === 'ValidationError') {
        next(new UncorectDataError('Данные для обновления вашего профиля введены с ошибкой, пожалуйста, проверьте поля и значения'));
      }
      if (err.name === 'CastError') {
        next(new UncorectDataError('Такого пользователя несуществует, проверьте ID пользователя'));
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  console.log(avatar);
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.message === 'NotValidId') {
        next(new NotFoundError('Такого пользователя нет в базе'));
      }
      if (err.name === 'ValidationError') {
        next(new UncorectDataError('Данные для обновления вашего профиля введены с ошибкой, пожалуйста, проверьте поля и значения'));
      }
      if (err.name === 'CastError') {
        next(new UncorectDataError('Такого пользователя несуществует, проверьте ID пользователя'));
      }
      next(err);
    });
};
