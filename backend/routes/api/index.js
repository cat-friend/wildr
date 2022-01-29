const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const imagesRouter = require('./images.js');
const userIconsRouter = require('./usericons.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

router.use('/images', imagesRouter);
router.use('/usericons', userIconsRouter);

module.exports = router;
