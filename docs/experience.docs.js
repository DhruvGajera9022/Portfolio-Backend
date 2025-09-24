/**
 * @swagger
 * tags:
 *   name: Experience
 *   description: Experience management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Location:
 *       type: object
 *       properties:
 *         city:
 *           type: string
 *           example: San Francisco
 *         state:
 *           type: string
 *           example: California
 *         country:
 *           type: string
 *           example: USA
 *
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
 *     Project:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Internal Dashboard
 *         description:
 *           type: string
 *           example: Built a dashboard for internal analytics and monitoring.
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["React", "Chart.js", "Node.js"]
 *         url:
 *           type: string
 *           example: https://dashboard.techsolutions.com
 *         _id:
 *           type: string
 *           example: 68d3868514b1796d545893ba
 *
 *     ExperienceImage:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *           example: https://www.techsolutions.com/project1.png
 *         publicId:
 *           type: string
 *           example: project1-image
 *         caption:
 *           type: string
 *           example: Screenshot of internal dashboard
 *         _id:
 *           type: string
 *           example: 68d3868514b1796d545893bb
 *
 *     Experience:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68d3868514b1796d545893b9
 *         jobTitle:
 *           type: string
 *           example: Senior Software Engineer
 *         company:
 *           type: string
 *           example: Tech Solutions Ltd
 *         companyUrl:
 *           type: string
 *           example: https://www.techsolutions.com
 *         companyLogo:
 *           $ref: '#/components/schemas/CompanyLogo'
 *         employmentType:
 *           type: string
 *           example: Full-time
 *         workMode:
 *           type: string
 *           example: Remote
 *         location:
 *           $ref: '#/components/schemas/Location'
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: 2022-05-01T00:00:00.000Z
 *         endDate:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         isCurrent:
 *           type: boolean
 *           example: true
 *         description:
 *           type: string
 *           example: Worked on building scalable web applications and APIs using Node.js and React.
 *         responsibilities:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Develop and maintain RESTful APIs", "Collaborate with frontend team to integrate APIs"]
 *         achievements:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Improved API response time by 40%", "Mentored 3 junior developers"]
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Node.js", "Express", "MongoDB", "React", "Docker"]
 *         projects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Project'
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExperienceImage'
 *         featured:
 *           type: boolean
 *           example: true
 *         displayOrder:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     ExperiencesResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Experiences fetched successfully
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Experience'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Experience not found
 */

/**
 * @swagger
 * /api/experience:
 *   post:
 *     summary: Create a new experience
 *     tags: [Experience]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Experience'
 *     responses:
 *       201:
 *         description: Experience created successfully
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
 *                   example: Experience created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Experience'
 *
 *   get:
 *     summary: Get all experiences
 *     tags: [Experience]
 *     responses:
 *       200:
 *         description: List of experiences
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExperiencesResponse'
 *
 * /api/experience/{id}:
 *   get:
 *     summary: Get experience by ID
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience fetched successfully
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
 *                   example: Experience fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   put:
 *     summary: Update an existing experience
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               jobTitle:
 *                 type: string
 *               company:
 *                 type: string
 *               companyUrl:
 *                 type: string
 *               employmentType:
 *                 type: string
 *               workMode:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   city:
 *                     type: string
 *                   state:
 *                     type: string
 *                   country:
 *                     type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               isCurrent:
 *                 type: boolean
 *               description:
 *                 type: string
 *               responsibilities:
 *                 type: array
 *                 items:
 *                   type: string
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *               technologies:
 *                 type: array
 *                 items:
 *                   type: string
 *               projects:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *                     technologies:
 *                       type: array
 *                       items:
 *                         type: string
 *                     url:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *               companyLogo:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Experience updated successfully
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
 *                   example: Experience updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Experience'
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *   delete:
 *     summary: Delete an experience
 *     tags: [Experience]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experience ID
 *     responses:
 *       200:
 *         description: Experience deleted successfully
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
 *                   example: Experience deleted successfully
 *       404:
 *         description: Experience not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
