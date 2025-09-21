const cloudinary = require("../config/cloudinary.config");
const fs = require("fs");

const uploadFile = async (filePath, folder = "uploads") => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder,
            resource_type: "auto", // supports image, video, pdf, etc.
        });

        // remove local file after upload
        fs.unlinkSync(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id,
        };
    } catch (error) {
        throw new Error("Cloudinary upload failed: " + error.message);
    }
};

const deleteFile = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new Error("Cloudinary delete failed: " + error.message);
    }
};

module.exports = { uploadFile, deleteFile };
