const express = require('express');
const ownerRouter = express.Router();

ownerRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the owners to you');
})
.post((req, res) => {
    res.end(`Will add the owner: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /owners');
})
.delete((req, res) => {
    res.end('Deleting all owners');
});

ownerRouter.route('/:ownerId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the owner: ${req.params.ownerId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /owners/${req.params.ownerId}`);
})
.put((req, res) => {
    res.write(`Updating the owner: ${req.params.ownerId}\n`);
    res.end(`Will update the owner: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting owner: ${req.params.ownerId}`);
});


module.exports = ownerRouter;