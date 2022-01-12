const express = require('express')
const router = express.Router();
const asyncHandler = require('express-async-handler');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Image } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// middleware

const validateImage = [

]

router.get('/:imageId', asyncHandler(async (req, res, next) => {
    console.log(req.params.imageId);
    const image = await Image.findByPk(1)
    return res.json(image);
}));

// getting all images
router.get('/', asyncHandler(async (req, res, next) => {
    const images = await Image.findAll({
        order: [['updatedAt', 'DESC']]
    });
    return res.json(images);
}));


// // Posting an image
// router.post('/', validateImage, asyncHandler(async (req, res, next) => {
//     const { title, url, description, userId, albumId } = req.body;
//     const image = await Image.create({ title, url, description, userId, albumId });
//     return res.json({ image });
// }));

// // editing an image
// router.put('/:imageId(\\d+)', validateImage, asyncHandler(async (req, res, next) => {
//     const { id, title, url, description, userId, albumId } = req.body;
//     const currImage = await Image.findByPk(id);
//     if (!currImage) throw new Error('Cannot find image.');
//     const updatedImage = currImage.update({ title, url, description, userId, albumId });
//     return res.json({ updatedImage });
// }));

// // deleting an image
// router.delete('/:imageId(\\d+)', asyncHandler(async (req, res, next) => {
//     const id = req.params.imageId;
//     const currImage = await Image.findByPk(id);
//     if (!currImage) throw new Error('Cannot find image.');
//     const delImage = await Image.destroy({where: id});
//     return id;
// }))
module.exports = router;
