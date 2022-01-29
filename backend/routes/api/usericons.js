const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { UserIcon } = require('../../db/models');

router.get('/', asyncHandler(async (req, res, next) => {
    const userIcons = await UserIcon.findAll();
    return res.json(userIcons);
}))

module.exports = router;
