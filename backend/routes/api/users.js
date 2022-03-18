const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser, checkExistence } = require('../../utils/auth');
const { User, Profile, UserIcon, Image, Collection } = require('../../db/models');

const router = express.Router();

// middleware
const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

const validateProfile = [
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description of yourself. We\'d love to get to know you!'),
    check('userIconId')
        .exists({ checkFalsy: true })
        .withMessage('Please select a user icon.'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 3, max: 350 })
        .withMessage('Please limit your description to be between 3 and 350 characters.'),
    handleValidationErrors,
];

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });
        await Profile.create({
            userId: user.id
        });
        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    })
);
// User pages - gets user's collections
router.get('/:userId(\\d+)/collections', asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    checkExistence(User, userId, next);
    const collections = await Collection.findAll({ where: { userId } });
    return res.json(collections);
}));

// User pages - gets user's images
router.get('/:userId(\\d+)/images', asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    checkExistence(User, userId, next);
    const images = await Image.findAll({ where: { userId } });
    return res.json(images);
}));

// User pages - gets profile info (description, username)
router.get('/:userId(\\d+)', asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findByPk(userId, { include: [UserIcon] });
    checkExistence(User, userId, next);
    return res.json(user);
}));

// Editing description / userId
router.put('/:userId(\\d+)', validateProfile, asyncHandler(async (req, res) => {
    const { userId } = req.params;
    checkExistence(User, userId, next);
    const currUser = await User.findByPk(userId);
    const { description, userIconId } = req.body;
    const updatedUser = await currUser.update({ description, userIconId });
    return res.json(updatedUser);
}));

module.exports = router;
