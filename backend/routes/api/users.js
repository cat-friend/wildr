const express = require('express');
const asyncHandler = require('express-async-handler');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { User, Profile, UserIcon } = require('../../db/models');

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

// Sign up
router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    })
);

// User pages
router.get('/:userId', asyncHandler(async (req, res) => {
    console.log("req.params", req.params.userId);
    const user = await User.findByPk(req.params.userId);
    const profile = await Profile.findByPk(req.params.userId);
    const userIcon = await UserIcon.findByPk(profile.userIconId);
    const profileData = {
        user, profile, userIcon
    }
    return res.json(profileData);
}));

router.post('/:userId', asyncHandler(async (req, res) => {
    console.log("post route");
    res.json();
    // const user = await User.findByPk(req.params.userId);
    // const profile = await Profile.findByPk(req.params.userId);
    // const userIcon = await UserIcon.findByPk(profile.userIconId);
    // const profileData = {
    //     user, profile, userIcon
    // }
    // return res.json(profileData);
}));
module.exports = router;
