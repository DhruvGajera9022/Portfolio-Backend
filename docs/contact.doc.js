/**
 * @swagger
 * tags:
 *   name: Contact
 *   description: Contact management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Attachment:
 *       type: object
 *       properties:
 *         fileName:
 *           type: string
 *           example: requirements.pdf
 *         url:
 *           type: string
 *           example: https://example.com/files/requirements.pdf
 *         publicId:
 *           type: string
 *           example: attachments/requirements
 *         fileSize:
 *           type: integer
 *           example: 102400
 *         mimeType:
 *           type: string
 *           example: application/pdf
 *
 *     ContactRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - subject
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         company:
 *           type: string
 *           example: Example Corp
 *         subject:
 *           type: string
 *           example: Website Development Inquiry
 *         message:
 *           type: string
 *           example: Hello, I am interested in developing a new website for our company. Please provide a quote and timeline.
 *         projectType:
 *           type: string
 *           enum: [Web Development, Mobile App, UI/UX Design, Consultation, Other]
 *           example: Web Development
 *         budget:
 *           type: string
 *           enum: [Under $1K, $1K-$5K, $5K-$10K, $10K-$25K, $25K+, Not Sure]
 *           example: $5K-$10K
 *         timeline:
 *           type: string
 *           enum: [ASAP, 1-2 weeks, 1 month, 2-3 months, 3+ months, Flexible]
 *           example: 1 month
 *         attachments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attachment'
 *         source:
 *           type: string
 *           enum: [website, api, referral]
 *           example: website
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           example: 2025-09-29T10:00:00.000Z
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ContactResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 68d237a9d2636625eed63861
 *         name:
 *           type: string
 *           example: John Doe
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         phone:
 *           type: string
 *           example: +1234567890
 *         company:
 *           type: string
 *           example: Example Corp
 *         subject:
 *           type: string
 *           example: Website Development Inquiry
 *         message:
 *           type: string
 *           example: Hello, I am interested in developing a new website for our company. Please provide a quote and timeline.
 *         projectType:
 *           type: string
 *           example: Web Development
 *         budget:
 *           type: string
 *           example: $5K-$10K
 *         timeline:
 *           type: string
 *           example: 1 month
 *         attachments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Attachment'
 *         status:
 *           type: string
 *           example: new
 *         priority:
 *           type: string
 *           example: medium
 *         response:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: We have received your inquiry.
 *             respondedAt:
 *               type: string
 *               format: date-time
 *               example: 2025-09-23T08:00:00.000Z
 *             respondedBy:
 *               type: string
 *               example: 64f7c5df82a5d3b9f7fbc999
 *         notes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 example: Followed up via email
 *               addedBy:
 *                 type: string
 *                 example: 64f7c5df82a5d3b9f7fbc999
 *               addedAt:
 *                 type: string
 *                 format: date-time
 *                 example: 2025-09-23T09:00:00.000Z
 *         source:
 *           type: string
 *           example: website
 *         userAgent:
 *           type: string
 *           example: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
 *         ipAddress:
 *           type: string
 *           example: 192.168.1.1
 *         followUpDate:
 *           type: string
 *           format: date-time
 *           example: 2025-09-29T10:00:00.000Z
 *         isFollowUpComplete:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-23T06:01:14.043Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-09-23T06:01:14.043Z
 *         __v:
 *           type: integer
 *           example: 0
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Contact not found
 */


/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact inquiry
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   get:
 *     summary: Get all contacts
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: List of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContactResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a single contact by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   put:
 *     summary: Update a contact by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactRequest'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 *   delete:
 *     summary: Delete a contact by ID
 *     tags: [Contact]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact ID
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
