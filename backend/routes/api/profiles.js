const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image, Profile } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// middleware

const validateProfile = [
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description.')

]

router.get('/:profileId(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.profileId;
    const profile = await Profile.findByPk(id, {
        include: User
    })
    return res.json(profile);
}));

router.put('/:profileId(\\d+)', validateProfile, asyncHandler(async (req, res) => {
    const { user, profile } = req.body;
    const currUser = await User.findByPk(req.params.userId);
    const currProfile = await Profile.findByPk(req.params.userId);
    const currUserIcon = await UserIcon.findByPk(profile.userIconId);

    await currProfile.update({ description: profile.description, userIconId: profile.userIconId });

    const profileData = {
        user: currUser, profile: currProfile, userIcon: currUserIcon
    };

    return res.json(profileData);
}));

module.exports = router;
