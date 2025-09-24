/**
 * @swagger
 * tags:
 *   name: Project
 *   description: Project management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CompanyLogo:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: https://www.techsolutions.com/logo.png
 *         publicId:
 *           type: string
 *           example: techsolutions-logo
 *
 *     ProjectImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: https://www.techsolutions.com/project1.png
 *         publicId:
 *           type: string
 *           example: project1-image
 *         alt:
 *           type: string
 *           example: Screenshot of internal dashboard
 *         caption:
 *           type: string
 *           example: Dashboard main view
 *         isPrimary:
 *           type: boolean
 *           example: true
 *
 *     Project:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68d3868514b1796d545893ba
 *         title:
 *           type: string
 *           example: Internal Dashboard
 *         slug:
 *           type: string
 *           example: internal-dashboard
 *         description:
 *           type: string
 *           example: Built a dashboard for internal analytics and monitoring.
 *         shortDescription:
 *           type: string
 *           example: Dashboard for internal use
 *         category:
 *           type: string
 *           example: Web Application
 *         subcategory:
 *           type: string
 *           example: Admin Panel
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["React", "Node.js", "MongoDB"]
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProjectImage'
 *         liveUrl:
 *           type: string
 *           example: https://dashboard.techsolutions.com
 *         githubUrl:
 *           type: string
 *           example: https://github.com/techsolutions/dashboard
 *         status:
 *           type: string
 *           example: completed
 *         featured:
 *           type: boolean
 *           example: true
 *         priority:
 *           type: integer
 *           example: 1
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: 2023-01-01T00:00:00.000Z
 *         completedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-06-01T00:00:00.000Z
 *         challenges:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               solution:
 *                 type: string
 *         features:
 *           type: array
 *           items:
 *             type: string
 *         learnings:
 *           type: array
 *           items:
 *             type: string
 *         isPublic:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ProjectsResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Projects fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Project not found
 */

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *               liveUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               status:
 *                 type: string
 *               featured:
 *                 type: boolean
 *               priority:
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *               completedAt:
 *                 type: string
 *                 format: date
 *               challenges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     solution:
 *                       type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               learnings:
 *                 type: array
 *                 items:
 *                   type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Project created successfully
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
 *                   example: Project created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *
 *   get:
 *     summary: Get all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProjectsResponse'
 *
 * /api/project/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project fetched successfully
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
 *                   example: Project fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an existing project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               shortDescription:
 *                 type: string
 *               category:
 *                 type: string
 *               subcategory:
 *                 type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *               liveUrl:
 *                 type: string
 *               githubUrl:
 *                 type: string
 *               status:
 *                 type: string
 *               featured:
 *                 type: boolean
 *               priority:
 *                 type: integer
 *               startDate:
 *                 type: string
 *                 format: date
 *               completedAt:
 *                 type: string
 *                 format: date
 *               challenges:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     solution:
 *                       type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               learnings:
 *                 type: array
 *                 items:
 *                   type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Project updated successfully
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
 *                   example: Project updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
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
 *                   example: Project deleted successfully
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
