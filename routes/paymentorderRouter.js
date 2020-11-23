const express = require('express');
const paymentorderRouter = express.Router();

paymentorderRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the paymentorders to you');
})
.post((req, res) => {
    res.end(`Will add the paymentorder: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /paymentorders');
})
.delete((req, res) => {
    res.end('Deleting all paymentorders');
});

paymentorderRouter.route('/:paymentorderId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the paymentorder: ${req.params.paymentorderId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /paymentorders/${req.params.paymentorderId}`);
})
.put((req, res) => {
    res.write(`Updating the paymentorder: ${req.params.paymentorderId}\n`);
    res.end(`Will update the paymentorder: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting paymentorder: ${req.params.paymentorderId}`);
});


module.exports = paymentorderRouter;