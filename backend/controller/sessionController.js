const session = require("express-session")


function getUserId(req) {
    return req.session.userId
}


module.exports = { getUserId }

