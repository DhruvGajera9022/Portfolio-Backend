/**
 * @swagger
 * components:
 *   schemas:
 *     SkillIcon:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: https://example.com/react-icon.png
 *         publicId:
 *           type: string
 *           example: react-icon-123
 *         svg:
 *           type: string
 *           example: "<svg>...</svg>"
 *
 *     Certification:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: React Developer Certificate
 *         issuer:
 *           type: string
 *           example: Udemy
 *         url:
 *           type: string
 *           example: https://example.com/certificate
 *         obtainedAt:
 *           type: string
 *           format: date-time
 *           example: 2022-05-15T00:00:00.000Z
 *         expiresAt:
 *           type: string
 *           format: date-time
 *           example: 2025-05-15T00:00:00.000Z
 *
 *     Resource:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: React Official Documentation
 *         url:
 *           type: string
 *           example: https://reactjs.org/docs/getting-started.html
 *         type:
 *           type: string
 *           example: documentation
 *
 *     Skill:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68cfe28a6d3b3ec0ed112e93
 *         name:
 *           type: string
 *           example: React.js
 *         category:
 *           type: string
 *           example: Frontend
 *         subcategory:
 *           type: string
 *           example: UI Framework
 *         proficiency:
 *           type: integer
 *           example: 85
 *         yearsOfExperience:
 *           type: integer
 *           example: 3
 *         level:
 *           type: string
 *           example: Intermediate
 *         icon:
 *           $ref: '#/components/schemas/SkillIcon'
 *         color:
 *           type: string
 *           example: "#61DAFB"
 *         description:
 *           type: string
 *           example: Experience in building responsive and dynamic front-end applications using React.js.
 *         projects:
 *           type: array
 *           items:
 *             type: string
 *             example: 64f8e8b5f6d1c2a1b0d9f123
 *         certifications:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Certification'
 *         resources:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Resource'
 *         featured:
 *           type: boolean
 *           example: true
 *         displayOrder:
 *           type: integer
 *           example: 1
 *         isActive:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T11:33:30.156Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-21T11:42:40.518Z
 *
 *     SkillListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Skills fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Skill'
 *
 *     SkillSingleResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Skill fetched successfully
 *         data:
 *           $ref: '#/components/schemas/Skill'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Not found
 */

/**
 * @swagger
 * /api/skills:
 *   get:
 *     summary: Get all skills
 *     tags: [Skills]
 *     responses:
 *       200:
 *         description: List of skills
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillListResponse'
 *
 *   post:
 *     summary: Create a new skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       201:
 *         description: Skill created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillSingleResponse'
 *       409:
 *         description: Duplicate entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /api/skills/{id}:
 *   get:
 *     summary: Get a skill by ID
 *     tags: [Skills]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillSingleResponse'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Skill ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Skill'
 *     responses:
 *       200:
 *         description: Skill updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SkillSingleResponse'
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a skill
 *     tags: [Skills]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Skill ID
 *     responses:
 *       200:
 *         description: Skill deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Skill deleted successfully
 *       404:
 *         description: Skill not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
