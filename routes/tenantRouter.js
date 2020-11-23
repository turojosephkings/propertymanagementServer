const express = require('express');
const tenantRouter = express.Router();

tenantRouter.route('/')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the tenants to you');
})
.post((req, res) => {
    res.end(`Will add the tenant: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /tenants');
})
.delete((req, res) => {
    res.end('Deleting all tenants');
});

tenantRouter.route('/:tenantId')

.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end(`Will send details of the tenant: ${req.params.tenantId} to you`);
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /tenants/${req.params.tenantId}`);
})
.put((req, res) => {
    res.write(`Updating the tenant: ${req.params.tenantId}\n`);
    res.end(`Will update the tenant: ${req.body.name} with description: ${req.body.description}`);
})
.delete((req, res) => {
    res.end(`Deleting tenant: ${req.params.tenantId}`);
});


module.exports = tenantRouter;