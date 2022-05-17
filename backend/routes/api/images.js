const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { checkExistence, checkPermissions, checkImageCollectionExistence, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// middleware
const validateImage = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a title for your image.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be at least 3 characters long and no more than 100."),
    check('url')
        .exists({ checkFalsy: true })
        .isURL()
        .withMessage("Please provide a source URL for your image."),
    check(''),
    handleValidationErrors
];


// getting one image
router.get('/:imageId', asyncHandler(async (req, res, next) => {
    const image = await Image.findByPk(req.params.imageId)
    return res.json(image);
}));

// getting all images
router.get('/', asyncHandler(async (req, res, next) => {
    const images = await Image.findAll({
        order: [['updatedAt', 'DESC']]
    });
    return res.json(images);
}));

// updating an image
router.put('/:imageId(\\d+)', validateImage, asyncHandler(async (req, res, next) => {
    const { imageId, title, url, description, userId } = req.body;
    const imageExists = await checkExistence(Image, imageId, next);
    const currImage = await Image.findByPk(imageId);
    if (imageExists) {
        const isPermitted = checkPermissions(currImage, userId, next);
        if (isPermitted) {
            const updatedImage = await currImage.update({ title, url, description, userId });
            return res.json(updatedImage);
        }
    }
}));


// Posting an image
router.post('/', validateImage, asyncHandler(async (req, res, next) => {
    const { title, url, description, userId } = req.body;
    const image = await Image.create({ title, url, description, userId });
    return res.json(image);
}));


// deleting an image
router.delete('/:imageId(\\d+)', asyncHandler(async (req, res, next) => {
    const { imageId, userId } = req.body;
    const id = req.params.imageId;
    const currImage = await Image.findByPk(id);
    const exists = await checkExistence(Image, imageId, next);
    if (exists) {
        const isPermitted = checkPermissions(currImage, userId, next);
        if (isPermitted) {
            await currImage.destroy();
            return res.json(currImage);
        }
    }
}));
module.exports = router;
