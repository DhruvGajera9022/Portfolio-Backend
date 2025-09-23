const Contact = require("../models/Contact.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");

/**
 * Create a new contact inquiry
 */
exports.createContact = async (req, res) => {
    try {
        const contactData = req.body;
        logger.info(`[CREATE CONTACT] Request body: ${JSON.stringify(contactData)}`);

        const contact = await Contact.create(contactData);
        logger.info(`[CREATE CONTACT] Contact created: ${contact._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.CONTACT_CREATED_SUCCESS,
            data: contact,
        });
    } catch (err) {
        logger.error(`[CREATE CONTACT] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Get all contacts
 */
exports.getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        logger.info(`[GET CONTACTS] Retrieved ${contacts.length} contacts`);

        return successResponse(res, {
            data: contacts,
            message: MESSAGES.CONTACTS_FETCH_SUCCESS,
        });
    } catch (err) {
        logger.error(`[GET CONTACTS] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Get a single contact by ID
 */
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            logger.warn(`[GET CONTACT] Contact not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.CONTACT_NOT_FOUND,
            });
        }

        return successResponse(res, {
            data: contact,
            message: MESSAGES.CONTACT_FETCH_SUCCESS,
        });
    } catch (err) {
        logger.error(`[GET CONTACT] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Update a contact by ID
 */
exports.updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const contact = await Contact.findByIdAndUpdate(id, updateData, { new: true });
        if (!contact) {
            logger.warn(`[UPDATE CONTACT] Contact not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.CONTACT_NOT_FOUND,
            });
        }

        logger.info(`[UPDATE CONTACT] Contact updated: ${contact._id}`);
        return successResponse(res, {
            data: contact,
            message: MESSAGES.CONTACT_UPDATE_SUCCESS,
        });
    } catch (err) {
        logger.error(`[UPDATE CONTACT] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Delete a contact by ID
 */
exports.deleteContact = async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            logger.warn(`[DELETE CONTACT] Contact not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.CONTACT_NOT_FOUND,
            });
        }

        logger.info(`[DELETE CONTACT] Contact deleted: ${contact._id}`);
        return successResponse(res, {
            message: MESSAGES.CONTACT_DELETE_SUCCESS,
        });
    } catch (err) {
        logger.error(`[DELETE CONTACT] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};
