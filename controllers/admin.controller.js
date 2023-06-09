const express = require('express');
const router = express.Router();
const adminService = require('../services/admin.service');

// routes
router.post('/authenticate', authenticate);
router.post('/changePassword', changePassword);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/update', update);
router.delete('/:id', _delete);


module.exports = router;

function authenticate(req, res, next) {
    adminService.authenticate(req.body)
        .then(admin => admin ? res.json(admin) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function changePassword(req, res, next) {
    adminService.changePassword(req.body)
        .then(admin => res.json(admin))
        .catch(err => next(err));
}

function register(req, res, next) {
    adminService.create(req.body)
        .then((admin) => res.json(admin))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    adminService.getAll()
        .then(admins => res.json(admins))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    adminService.getById(req.admin.sub)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    adminService.getById(req.params.id)
        .then(admin => admin ? res.json(admin) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    adminService.update(req.body)
        .then((admin) => res.json(admin))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    adminService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}