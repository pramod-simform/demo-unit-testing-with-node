const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { commentService } = require('../services');
const catchModelErrors = require('../utils/catchModelErrors');

const createComment = catchAsync(catchModelErrors(async (req, res) => {
  const { _id } = req.user;
  req.body.createdBy = _id;
  
  const comment = await commentService.createComment(req.body);
  res.status(httpStatus.CREATED).send(comment);
}));

const getComments = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await commentService.queryComment(filter, options);
  res.send(result);
});

const getComment = catchAsync(async (req, res) => {
  const comment = await commentService.getCommentById(req.params.commentId);
  if (!comment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Comment not found');
  }
  res.send(comment);
});

const updateComment = catchAsync(async (req, res) => {
  const comment = await commentService.updateCommentById(req.params.commentId, req.body);
  res.send(comment);
});

const deleteComment = catchAsync(async (req, res) => {
  await commentService.deleteCommentById(req.params.commentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createComment,
  getComments,
  getComment,
  updateComment,
  deleteComment,
};
