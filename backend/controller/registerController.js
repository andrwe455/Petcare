const { auth,signup } = require('../database/firebase');

async function register(req, res, next) {
    try {
        const tempPassword = '123456';
        signup(auth, req.body.email, tempPassword).then((user) => {
            req.body.tempPassword = true;
            next();
        }).catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                res.status(400).json({ message: 'Mail is already in use' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    register
};