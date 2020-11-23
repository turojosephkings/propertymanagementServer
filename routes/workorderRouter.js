const express = require('express');
const workorderRouter = express.Router();

workorderRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the workorders to you');
})
.post((req, res) => {
    res.end(`Will add the workorder: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /workorders');
})
.delete((req, res) => {
    res.end('Deleting all workorders');
});

workorderRouter.route('/:workorderId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the workorder: ${req.params.workorderId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /workorders/${req.params.workorderId}`);
})
.put((req, res) => {
    res.write(`Updating the workorder: ${req.params.workorderId}\n`);
    res.end(`Will update the workorder: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting workorder: ${req.params.workorderId}`);
});


module.exports = workorderRouter;