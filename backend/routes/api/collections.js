const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
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

// CREATE a new collection

router.post('/', validateCollection, asyncHandler(async (req, res, next) => {
    const { title, userId } = req.body;

}))
