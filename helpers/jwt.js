const { expressjwt: jwt } = require("express-jwt");
const config = require('config.json');
const adminService = require('../services/admin.service');

function jwtToken() {
    const secret = config.secret;
    return jwt({ secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/admins/authenticate',
        ]
    });
}

async function isRevoked(req, payload, done) {
    const admin = await adminService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!admin) {
        return done(null, true);
    }

    done();
};

module.exports = jwtToken;