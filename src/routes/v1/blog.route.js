const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const blogValidation = require('../../validations/blog.validation');
const { blogController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('blog'), validate(blogValidation.createBlog), blogController.createBlog)
  .get(auth('getBlogs'), validate(blogValidation.getBlogs), blogController.getBlogs);

router
  .route('/:blogId')
  .get(auth('getBlogs'), validate(blogValidation.getBlog), blogController.getBlog)
  .patch(auth('blog'), validate(blogValidation.updateBlog), blogController.updateBlog)
  .delete(auth('blog'), validate(blogValidation.deleteBlog), blogController.deleteBlog);

module.exports = router;

/**
 * @swagger
 * tags:
 *   title: Blogs
 *   description: Blog management and retrieval
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a blog
 *     description: Only admins/user can create other blogs.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - subject
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 description: must be unique
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: fake title
 *               subject: fake subject
 *               description: fake description
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Blog'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBlog'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all blogs
 *     description: Only admins/users can retrieve all blogs.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         title: title
 *         schema:
 *           type: string
 *         description: Blog title
 *       - in: query
 *         title: role
 *         schema:
 *           type: string
 *         description: Blog role
 *       - in: query
 *         title: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. title:asc)
 *       - in: query
 *         title: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of blogs
 *       - in: query
 *         title: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Blog'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /blogs/{blogId}:
 *   get:
 *     summary: Get a blog
 *     description: Logged in admins/users can fetch blogs information.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         title: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Blog'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a blog
 *     description: Logged in user can only update their own blog. Admins can update any blog.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         title: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: must be unique
 *               subject:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               title: fake title
 *               subject: fake subject
 *               description: fake description
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Blog'
 *       "400":
 *         $ref: '#/components/responses/DuplicateBlog'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a blog
 *     description: Logged in users can delete only own blogs. Only admins can delete any blog.
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: blogId
 *         in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
