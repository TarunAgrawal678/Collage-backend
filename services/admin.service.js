const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../helpers/db.js');
const config = require('config.json');
const Admin = db.Admin;

module.exports = {
    authenticate,
    changePassword,
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

async function changePassword(adminParam){
    const admin= await Admin.findOne({username:adminParam.username});
    if(admin){
        if(bcrypt.compareSync(adminParam.password,admin.hash)){
            if (adminParam.newPassword) {
                admin.hash = bcrypt.hashSync(adminParam.newPassword, 10);
            }
            await admin.save()
            return {message:'Password changed successfully.'};
        }else{
            throw 'Password does not matched.';
        }
    }else{
        throw 'User not found.';
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
        return {message:'User saved successfully'};
    }

}

async function update(adminParam) {
    const admin = await Admin.findOne({username:adminParam.username});
    // validate
    if (!admin) throw 'User not found';
    // copy adminParam properties to admin
    Object.assign(admin, adminParam);
    if(await admin.save()){
        return {message:'User updated successfully'};
    }

}

async function _delete(id) {
    await Admin.findByIdAndRemove(id);
}