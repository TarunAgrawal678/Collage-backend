const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db.js');
const config = require('config.json');
const Admin = db.Admin;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({username,password}){
    const admin= await Admin.findOne({username});
    if(admin && bcrypt.compareSync(password,admin.hash)){
        const token= jwt.sign({sub:admin.id},config.secret,{expiresIn:'1d'});
        return {
            data:{...admin.toJSON()},
            token
        };
    }
}

async function getAll(){
    return await Admin.find();
}

async function getById(id){
    return await Admin.findById(id);
}

async function create(adminParam){
    // validate
    if (await Admin.findOne({ username: adminParam.username })) {
        throw 'Username "' + adminParam.username + '" is already taken';
    }

    const admin = new Admin(adminParam);

    // hash password
    if (adminParam.password) {
        admin.hash = bcrypt.hashSync(adminParam.password, 10);
    }

    // save user
    if(await admin.save()){
        throw 'User saved successfully';
    }

}

async function update(id, adminParam) {
    const admin = await Admin.findById(id);

    // validate
    if (!admin) throw 'User not found';
    if (admin.username !== adminParam.username && await Admin.findOne({ username: adminParam.username })) {
        throw 'Username "' + adminParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (adminParam.password) {
        adminParam.hash = bcrypt.hashSync(adminParam.password, 10);
    }

    // copy adminParam properties to admin
    Object.assign(admin, adminParam);

    await Admin.save();
}

async function _delete(id) {
    await Admin.findByIdAndRemove(id);
}