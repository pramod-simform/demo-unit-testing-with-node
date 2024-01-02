const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { blogService } = require('../services');
const catchModelErrors = require('../utils/catchModelErrors');

const createBlog = catchAsync(catchModelErrors(async (req, res) => {
  const { _id } = req.user;
  req.body.createdBy = _id;
  
  const blog = await blogService.createBlog(req.body);
  res.status(httpStatus.CREATED).send(blog);
}));

const getBlogs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'subject']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await blogService.queryBlogs(filter, options);
  res.send(result);
});

const getBlog = catchAsync(async (req, res) => {
  const blog = await blogService.getBlogById(req.params.blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }
  res.send(blog);
});

const updateBlog = catchAsync(async (req, res) => {
  const blog = await blogService.updateBlogById(req.params.blogId, req.body);
  res.send(blog);
});

const deleteBlog = catchAsync(async (req, res) => {
  await blogService.deleteBlogById(req.params.blogId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
