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
    await checkExistence(Collection, collectionId, next);
    await checkExistence(Image, imageId, next);
    await checkPermissions(collection, userId, next);
    const isAlreadyAdded = await checkImageCollectionExistence(ImageCollection, collectionId, imageId);
    if (isAlreadyAdded) {
        const error = new Error('Duplicate');
        error.status = 403;
        error.title = 'UNAUTHORIZED';
        error.errors = ['Image was previously added to this collection.']
        next(error);
    }
    await ImageCollection.create({ imageId, collectionId });
    const image = Image.findByPk(imageId);
    return res.json(image);
}));

// DELETE from a collection
router.delete('/:collectionId(\\d+)/:imageId(\\d+)', asyncHandler(async (req, res, next) => {
    const imageId = req.params.imageId;
    const collectionId = req.params.collectionId;
    const { userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    await checkExistence(Image, imageId, next);
    await checkExistence(Collection, collectionId, next);
    await checkPermissions(collection, userId, next);
    const isImageInCollection = await checkImageCollectionExistence(ImageCollection, collectionId, imageId);
    if (!isImageInCollection) {
        const error = new Error('Not found');
        error.status = 404;
        error.title = 'Not found';
        error.errors = ['Image is not currently in the collection.']
        next(error);
    }
    const imageInCollection = await ImageCollection.findOne({
        where: {
            collectionId,
            imageId
        }
    });
    const delImageInCollection = await imageInCollection.destroy();
    return res.json(delImageInCollection);
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
    await checkExistence(Collection, collectionId, next);
    await checkPermissions(collection, userId, next);
    await collection.update({ title });
    const updatedCollection = await Collection.findByPk(collectionId, { include: [Image] });
    return res.json(updatedCollection);
}));

// DELETE a collection
router.delete('/:collectionId(\\d+)', asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const { userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    await checkExistence(Collection, collectionId, next);
    await checkPermissions(collection, userId, next);
    const delCollection = await collection.destroy();
    return res.json(delCollection);
}));

// CREATE a new collection
router.post('/', validateCollection, asyncHandler(async (req, res) => {
    const { title, userId } = req.body;
    const collection = await Collection.create({ title, userId });
    return res.json(collection);
}));

module.exports = router;
