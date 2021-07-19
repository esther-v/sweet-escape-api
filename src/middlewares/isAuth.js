const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

const isAuth = (request, response, next) => {
    const token = request.headers.authorization.slice(7);
    if (token === undefined) {
        next() 
    }
    else {
        jwt.verify(token, secret, (error, user) => {
            if (error) {
                response.send(error.message);
            }
            else {
                const {firstname, email, country, userId, exp} = user;
                if (Date.now()/1000 >= exp) {
                    next()
                }
                request.user = {firstname, email, country, userId};
                next();
            }
        })
    }
}

module.exports = isAuth;