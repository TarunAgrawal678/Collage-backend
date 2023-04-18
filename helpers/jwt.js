const { expressjwt: jwt } = require("express-jwt");
const config = require('config.json');
const adminService = require('../services/admin.service');

// isRevoked(async (req, payload, done)=>{
//     const admin = await adminService.getById(payload.sub);

//     // revoke token if user no longer exists
//     if (!admin) {
//         return done(null, true);
//     }

//     done();
// });

function jwtToken() {
    const secret = config.secret;
    return jwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/admins/authenticate',
            '/admins/register',
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