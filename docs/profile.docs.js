/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: User profile management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfileResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: 64f7c5df82a5d3b9f7fbc123
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         email:
 *           type: string
 *           example: john.doe@example.com
 *         phone:
 *           type: string
 *           example: +91-9876543210
 *         location:
 *           type: string
 *           example: New York, USA
 *         title:
 *           type: string
 *           example: Software Engineer
 *         bio:
 *           type: string
 *           example: Passionate full-stack developer.
 *         avatar:
 *           type: string
 *           example: https://res.cloudinary.com/demo/avatar.jpg
 *         resume:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: https://res.cloudinary.com/demo/resume.pdf
 *             fileName:
 *               type: string
 *               example: JohnDoe_Resume.pdf
 *             uploadedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-09-20T10:00:00.000Z
 *         socialLinks:
 *           type: object
 *           properties:
 *             github:
 *               type: string
 *               example: https://github.com/johndoe
 *             linkedin:
 *               type: string
 *               example: https://linkedin.com/in/johndoe
 *
 *     UpdateProfileRequest:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           example: John
 *         lastName:
 *           type: string
 *           example: Doe
 *         phone:
 *           type: string
 *           example: +91-9876543210
 *         location:
 *           type: string
 *           example: New York, USA
 *         title:
 *           type: string
 *           example: Backend Developer
 *         bio:
 *           type: string
 *           example: Love building scalable systems.
 *         socialLinks:
 *           type: object
 *           properties:
 *             github:
 *               type: string
 *               example: https://github.com/johndoe
 *             linkedin:
 *               type: string
 *               example: https://linkedin.com/in/johndoe
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *
 * /api/profile/update:
 *   put:
 *     summary: Update user profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             allOf:
 *               - $ref: '#/components/schemas/UpdateProfileRequest'
 *               - type: object
 *                 properties:
 *                   avatar:
 *                     type: string
 *                     format: binary
 *                   resume:
 *                     type: string
 *                     format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProfileResponse'
 *       400:
 *         description: Invalid request body or no valid fields to update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 */
