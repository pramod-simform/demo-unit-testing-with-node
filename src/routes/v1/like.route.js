const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const likeValidation = require('../../validations/like.validation');
const { likeController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(auth('like'), validate(likeValidation.createLike), likeController.createLike)
  .get(auth('getLikes'), validate(likeValidation.getLikes), likeController.getLikes);

router
  .route('/:likeId')
  .get(auth('getLikes'), validate(likeValidation.getLike), likeController.getLike)
  .delete(auth('like'), validate(likeValidation.deleteLike), likeController.deleteLike);

module.exports = router;

/**
 * @swagger
 * tags:
 *   title: Likes
 *   description: Like management and retrieval
 */

/**
 * @swagger
 * /likes:
 *   post:
 *     summary: Create a like or delete if already exists
 *     description: Only admins/user can create other likes.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - userId
 *             properties:
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *             example:
 *               postId: 6593e3a23febe53db7d97216
 *               userId: 6593e3a23febe53db7d97216
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Like'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all likes
 *     description: Only admins/users can retrieve all likes.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *         description: Maximum number of likes
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
 *                     $ref: '#/components/schemas/Like'
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
 * /likes/{likeId}:
 *   get:
 *     summary: Get a like
 *     description: Logged in admins/users can fetch likes information.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: likeId
 *         in: path
 *         title: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Like id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Like'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *
 *   delete:
 *     summary: Delete a like
 *     description: Logged in users can delete only own likes. Only admins can delete any like.
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: likeId
 *         in: path
 *         id: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Like id
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
