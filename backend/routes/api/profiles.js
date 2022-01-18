const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image, Profile } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


router.get('/:profileId(\\d+)', asyncHandler(async (req, res, next) => {
    const id = req.params.profileId;
    const profile = await Profile.findByPk(id);
    return res.json(profile);
}));

module.exports = router;
