const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Collection, Image, ImageCollection } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const collection = require('../../db/models/collection');

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


// CREATE a new collection

router.post('/', validateCollection, asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;
    const collection = await Collection.create({title, userId});
    return res.json(collection);
}));

// READ a collection

router.get('/:collectionId(\\d+)'), asyncHandler(async (req, res, next) => {
    const collectionId = req.params.collectionId;
    const collection = await Collection.findByPk(collectionId);
    if (!collection) {
        const error = new Error('Cannot find the requested image.');
        error.status = 404;
        error.title = 'Cannot find resource.'
        next(error);
    }
    return res.json(collection);
})
