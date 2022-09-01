const jwt = require('jsonwebtoken');

// Validate the authenticity of a JWT token if there is one
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).send({
            message: 'No token provided !',
        });
    }

    jwt.verify(token.split(' ')[1], process.env.jwt_private, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized !',
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const hasAccess = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token.split(' ')[1], process.env.jwt_private, (err) => {
            if (!err) {
                next();
            }
        });
    }
    res.redirect('/');
};

module.exports = {
    verifyToken,
    hasAccess
};
