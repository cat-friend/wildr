const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { checkExistence, checkPermissions, checkImageCollectionExistence } = require('../../utils/auth');
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
router.post('/:collectionId(\\d+)'), asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findByPk(collectionId);
    checkExistence(Collection, collectionId, next);
    checkPermissions(collection, userId, next);
    return res.json(collection);
});

// DELETE from a collection
router.delete('/:collectionId(\\d+)/:imageId(\\d+)'), asyncHandler(async (req, res, next) => {
    const imageId = req.params.imageId;
    const collectionId = req.params.collectionId;
    const { userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    checkExistence(Image, imageId, next);
    checkExistence(Collection, collectionId, next);
    checkImageCollectionExistence(ImageCollection, collectionId, imageId, next);
    checkPermissions(collection, userId, next);
    const delCollection = await ImageCollection.findOne({
        where: {
            collectionId,
            imageId
        }
    });
    return res.json(delCollection);
});


// READ a collection
router.get('/:collectionId(\\d+)'), asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findByPk(collectionId);
    checkExistence(Collection, collectionId, next);
    return res.json(collection);
});

// UPDATE a collection
router.put('/collectionId(\\d+)', validateCollection, asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const { title, userId } = req.body;
    const collection = await Collection.findByPk(collectionId);
    checkExistence(Collection, collectionId, next);
    checkPermissions(collection, userId, next);
    const updatedCollection = await collection.update({ title });
    return res.json(updatedCollection);
}));

// CREATE a new collection
router.post('/', validateCollection, asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;
    const collection = await Collection.create({ title, userId });
    return res.json(collection);
}));
