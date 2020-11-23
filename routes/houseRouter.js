const express = require('express');
const houseRouter = express.Router();

houseRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the houses to you');
})
.post((req, res) => {
    res.end(`Will add the house: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /houses');
})
.delete((req, res) => {
    res.end('Deleting all houses');
});

houseRouter.route('/:houseId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the house: ${req.params.houseId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /houses/${req.params.houseId}`);
})
.put((req, res) => {
    res.write(`Updating the house: ${req.params.houseId}\n`);
    res.end(`Will update the house: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting house: ${req.params.houseId}`);
});


module.exports = houseRouter;