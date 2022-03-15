const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Profile, UserIcon, Image } = require('../../db/models');

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

// User pages

router.get('/:userId', asyncHandler(async (req, res) => {
    if (req.params.userId < 1) {
        const error = new Error('The page does not exist.');
        error.status = 404;
        error.title = 'Resource does not exist.'
        next(error);
    }
    const user = await User.findByPk(req.params.userId, { include: [UserIcon] });
    // const user = await User.findByPk(req.params.userId, { include: [UserIcon, Image, Album] });
    return res.json(user);
}));

// Editing description / userId
router.put('/:userId', validateProfile, asyncHandler(async (req, res) => {
    if (req.params.userId < 1) {
        const error = new Error('The page does not exist.');
        error.status = 404;
        error.title = 'Resource does not exist.'
        next(error);
    }
    const currUser = await User.findByPk(req.params.userId);
    const { description, userIconId } = req.body.User;
    await currUser.update({ description, userIconId });
    return res.json(currUser);
}));

module.exports = router;
