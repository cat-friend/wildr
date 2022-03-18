const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, user) => {
    // Create the token.
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }, // 604,800 seconds = 1 week
    );

    const isProduction = process.env.NODE_ENV === "production";

    // Set the token cookie
    res.cookie('token', token, {
        maxAge: expiresIn * 1000, // maxAge in milliseconds
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && "Lax",
    });

    return token;
};

const restoreUser = (req, res, next) => {
    // token parsed from cookies
    const { token } = req.cookies;

    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
        if (err) {
            return next();
        }

        try {
            const { id } = jwtPayload.data;
            req.user = await User.scope('currentUser').findByPk(id);
        } catch (e) {
            res.clearCookie('token');
            return next();
        }

        if (!req.user) res.clearCookie('token');

        return next();
    });
};

// If there is no current user, return an error
const requireAuth = [
    restoreUser,
    function (req, res, next) {
        if (req.user) return next();
        const err = new Error('Unauthorized');
        err.title = 'Unauthorized';
        err.errors = ['Unauthorized'];
        err.status = 401;
        return next(err);
    },
];

const checkPermissions = (item, currUserId, next) => {
    if (item.userId !== currUserId) {
        const error = new Error('You are not authorized to perform this operation.');
        error.status = 403;
        error.title = 'UNAUTHORIZED';
        next(error)
    }
    return true;
}

const checkExistence = (model, pk, next) => {
    const item = await model.findByPk(pk);
    if (!item) {
        const error = new Error(`Cannot find the requested resource within ${model}.`);
        error.status = 404;
        error.title = 'Cannot find resource.'
        next(error);
    }
    return true;
}

const checkImageCollectionExistence = (model, collectionId, imageId, next) => {
    const item = await model.findOne({
        where: {
            collectionId,
            imageId
        }
    });
    if (!item) {
        const error = new Error(`Cannot find the requested resource within ${model}.`);
        error.status = 404;
        error.title = 'Cannot find resource.'
        next(error);
    }
    return true;
}
module.exports = { setTokenCookie, restoreUser, requireAuth, checkPermissions, checkExistence, checkImageCollectionExistence };
