const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { checkExistence, checkPermissions, checkImageCollectionExistence, restoreUser } = require('../../utils/auth');
const { Collection, Image, ImageCollection } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// error handling middleware

const validateCollection = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage("Please provide a title for your collection.")
        .isLength({ min: 3, max: 100 })
        .withMessage("Title must be at least 3 characters long and no more than 100."),
    check('userId')
        .exists({ checkFalsy: true })
        .withMessage("Error! No user ID detected. Please try again."),
    handleValidationErrors
];

// POST an image to a collection
router.post('/:collectionId(\\d+)', asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const { imageId, userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    const collectionExists = await checkExistence(Collection, collectionId, next);
    if (collectionExists) {
        const imageExists = await checkExistence(Image, imageId, next);
        if (imageExists) {
            const isPermitted = checkPermissions(collection, userId, next);
            if (isPermitted) {
                const isAlreadyAdded = await checkImageCollectionExistence(ImageCollection, collectionId, imageId);
                if (isAlreadyAdded) {
                    const error = new Error('Duplicate');
                    error.status = 403;
                    error.title = 'UNAUTHORIZED';
                    error.errors = ['Image was previously added to this collection.']
                    next(error);
                }
                else {
                    await ImageCollection.create({ imageId, collectionId });
                    const image = Image.findByPk(imageId);
                    return res.json(image);
                }
            }
        }
    }

}));

// DELETE from a collection
router.delete('/:collectionId(\\d+)/:imageId(\\d+)', asyncHandler(async (req, res, next) => {
    const imageId = req.params.imageId;
    const collectionId = req.params.collectionId;
    const { userId } = req.body;
    const isImageInCollection = await checkImageCollectionExistence(ImageCollection, collectionId, imageId);
    const collection = await Collection.findByPk(collectionId);
    if (isImageInCollection) {
        const isPermitted = checkPermissions(collection, userId, next);
        if (isPermitted) {
            const imageInCollection = await ImageCollection.findOne({
                where: {
                    collectionId,
                    imageId
                }
            });
            const delImageInCollection = await imageInCollection.destroy();
            return res.json(delImageInCollection);
        }
    }
    if (!isImageInCollection) {
        const error = new Error('Not found');
        error.status = 404;
        error.title = 'Not found';
        error.errors = ['Image is not currently in the collection.']
        next(error);
    }
}));


// READ a collection
router.get('/:collectionId(\\d+)', asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    await checkExistence(Collection, collectionId, next);
    const collection = await Collection.findByPk(collectionId, { include: [Image] });
    return res.json(collection);
}));

// UPDATE a collection
router.put('/:collectionId(\\d+)', validateCollection, asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const { title, userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    const exists = await checkExistence(Collection, collectionId, next);
    if (exists) {
        const isPermitted = checkPermissions(collection, userId, next);
        if (isPermitted) {
            await collection.update({ title });
            const updatedCollection = await Collection.findByPk(collectionId, { include: [Image] });
            return res.json(updatedCollection);
        }
    }
}));

// DELETE a collection
router.delete('/:collectionId(\\d+)', asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const { userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    const exists = await checkExistence(Collection, collectionId, next);
    if (exists) {
        const isPermitted = checkPermissions(collection, userId, next);
        if (isPermitted) {
            await collection.destroy();
            return res.json(collection);
        }
    }
}));

// CREATE a new collection
router.post('/', validateCollection, asyncHandler(async (req, res) => {
    const { title, userId } = req.body;
    const collection = await Collection.create({ title, userId });
    return res.json(collection);
}));

module.exports = router;
