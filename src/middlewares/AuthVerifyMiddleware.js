let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.headers['token-key'];

    jwt.verify(token, "key123", (err, decoded) => {
        if (err) {
            res.status(401).json({
                status: "unauthorized",
                data: err
            });
        } else {

            //Get username from decoded token and add it to request header
            let username = decoded['data']['UserName'];
            req.headers['username'] = username;
            next();
        }
    })
};