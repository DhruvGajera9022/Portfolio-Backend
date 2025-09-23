const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const contactController = require("../controllers/contact.controller");
const { contactSchema } = require("../validations/contact.validation");

/**
 * @route   POST /api/contacts
 * @desc    Create a new contact inquiry
 * @access  Public
 */
router.post(
    "/",
    validateRequest(contactSchema),
    contactController.createContact
);

/**
 * @route   GET /api/contacts
 * @desc    Get all contact inquiries
 * @access  Public
 */
router.get("/", contactController.getAllContacts);

/**
 * @route   GET /api/contacts/:id
 * @desc    Get a single contact by ID
 * @access  Public
 */
router.get("/:id", contactController.getContactById);

/**
 * @route   PUT /api/contacts/:id
 * @desc    Update a contact by ID
 * @access  Public
 */
router.put("/:id", validateRequest(contactSchema), contactController.updateContact);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete a contact by ID
 * @access  Public
 */
router.delete("/:id", contactController.deleteContact);

module.exports = router;
