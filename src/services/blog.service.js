const httpStatus = require('http-status');
const { Blog } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a blog
 * @param {Object} blogBody
 * @returns {Promise<Blog>}
 */
const createBlog = async (blogBody) => {
  return Blog.create(blogBody);
};

/**
 * Query for blogs
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBlogs = async (filter, options) => {
  const blogs = await Blog.paginate(filter, options);
  return blogs;
};

/**
 * Get blog by id
 * @param {ObjectId} id
 * @returns {Promise<Blog>}
 */
const getBlogById = async (id) => {
  return Blog.findById(id);
};

/**
 * Update blog by id
 * @param {ObjectId} blogId
 * @param {Object} updateBody
 * @returns {Promise<Blog>}
 */
const updateBlogById = async (blogId, updateBody) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (updateBody.title && (await Blog.isBlogExistsWitTitle(updateBody.title, blogId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Blog already exist with title!');
  }

  Object.assign(blog, updateBody);
  await blog.save();

  return blog;
};

/**
 * Delete blog by id
 * @param {ObjectId} blogId
 * @returns {Promise<Blog>}
 */
const deleteBlogById = async (blogId) => {
  const blog = await getBlogById(blogId);
  if (!blog) {
    throw new ApiError(httpStatus.NOT_FOUND, 'blog not found');
  }
  await blog.remove();
  return blog;
};

module.exports = {
  createBlog,
  queryBlogs,
  getBlogById,
  updateBlogById,
  deleteBlogById,
};
