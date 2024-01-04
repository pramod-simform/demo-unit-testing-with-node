const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createLike = {
  body: Joi.object().keys({
    postId: Joi.string().trim().custom(objectId).required(),
    userId: Joi.string().trim().custom(objectId).required(),
  }),
};

const getLikes = {
  query: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getLike = {
  params: Joi.object().keys({
    likeId: Joi.string().custom(objectId),
  }),
};

const deleteLike = {
  params: Joi.object().keys({
    likeId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createLike,
  getLikes,
  getLike,
  deleteLike,
};
