const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const commentValidation = require('../../validations/comment.validation');
const { commentController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('comment'), validate(commentValidation.createComment), commentController.createComment)
  .get(auth('getComments'), validate(commentValidation.getComments), commentController.getComments);

router
  .route('/:commentId')
  .get(auth('getComments'), validate(commentValidation.getComment), commentController.getComment)
  .patch(auth('comment'), validate(commentValidation.updateComment), commentController.updateComment)
  .delete(auth('comment'), validate(commentValidation.deleteComment), commentController.deleteComment);

module.exports = router;

/**
 * @swagger
 * tags:
 *   title: Comments
 *   description: Comment management and retrieval
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a comment
 *     description: Only admins/user can create other comments.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - postId
 *               - userId
 *             properties:
 *               text:
 *                 type: string
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *             example:
 *               text: fake comment
 *               postId: 6593e3a23febe53db7d97216
 *               userId: 6593e3a23febe53db7d97216
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all comments
 *     description: Only admins/users can retrieve all comments.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         title: text
 *         schema:
 *           type: string
 *         description: Comment text
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
 *         description: Maximum number of comments
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
 *                     $ref: '#/components/schemas/Comment'
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
 * /comments/{commentId}:
 *   get:
 *     summary: Get a comment
 *     description: Logged in admins/users can fetch comments information.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         title: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a comment
 *     description: Logged in user can only update their own comment. Admins can update any comment.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         title: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *             example:
 *               text: fake comment
 *               postId: 6593e3a23febe53db7d97216
 *               userId: 6593e3a23febe53db7d97216
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Comment'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a comment
 *     description: Logged in users can delete only own comments. Only admins can delete any comment.
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: commentId
 *         in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Comment id
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
