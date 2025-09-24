/**
 * @swagger
 * tags:
 *   name: Education
 *   description: Education management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Certificate:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Full Stack Web Development
 *         url:
 *           type: string
 *           example: https://example.com/certificates/fullstack
 *         issuedBy:
 *           type: string
 *           example: Coursera
 *         issueDate:
 *           type: string
 *           format: date
 *           example: 2023-04-15
 *
 *     Education:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f1e5b2e1f4b9c123456789
 *         institution:
 *           type: string
 *           example: University of Example
 *         degree:
 *           type: string
 *           example: Bachelor of Computer Applications
 *         fieldOfStudy:
 *           type: string
 *           example: Information Technology
 *         startDate:
 *           type: string
 *           format: date
 *           example: 2021-08-01
 *         endDate:
 *           type: string
 *           format: date
 *           nullable: true
 *           example: 2024-05-30
 *         grade:
 *           type: string
 *           example: 8.5/10
 *         description:
 *           type: string
 *           example: Completed my Bachelor's degree with a focus on backend development and database management.
 *         status:
 *           type: string
 *           enum: [completed, in-progress]
 *           example: completed
 *         link:
 *           type: string
 *           example: https://www.universityofexample.edu
 *         certificates:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Certificate'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     EducationsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Educations fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Education'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Education not found
 */

/**
 * @swagger
 * /api/education:
 *   post:
 *     summary: Create a new education entry
 *     tags: [Education]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       201:
 *         description: Education created successfully
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
 *                   example: Education created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *
 *   get:
 *     summary: Get all education entries
 *     tags: [Education]
 *     responses:
 *       200:
 *         description: List of educations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EducationsResponse'
 *
 * /api/education/{id}:
 *   get:
 *     summary: Get education entry by ID
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education fetched successfully
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
 *                   example: Education fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an existing education entry
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Education ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Education'
 *     responses:
 *       200:
 *         description: Education updated successfully
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
 *                   example: Education updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Education'
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an education entry
 *     tags: [Education]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Education ID
 *     responses:
 *       200:
 *         description: Education deleted successfully
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
 *                   example: Education deleted successfully
 *       404:
 *         description: Education not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
