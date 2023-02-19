let jwt = require("jsonwebtoken");

module.exports = {
    // Check Weather the token is available
    verifyToken: async (req, res, next) => {
        console.log(req.headers);
        let token = req.headers.authorization;
        if(token) {
            try {
                let payload = jwt.verify(token, "thisisasecret");
                req.user = payload;
                console.log(payload);
                res.json({user: req.user});
            } catch(error) {
                next(error);
            }
        } else {
            res.status(400).json({error: "Token Required"});
        }
    }
}