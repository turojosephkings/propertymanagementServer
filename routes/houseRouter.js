const express = require('express');
const House = require('../models/house');

const houseRouter = express.Router();

houseRouter.route('/')
.get((req, res, next) => {
    House.find()
    .then(houses => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(houses);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    House.create(req.body)
    .then(house => {
        console.log('House Created ', house);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(house);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /houses');
})
.delete((req, res, next) => {
    House.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

houseRouter.route('/:houseId')
.get((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(house);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /houses/${req.params.houseId}`);
})
.put((req, res, next) => {
    House.findByIdAndUpdate(req.params.houseId, {
        $set: req.body
    }, { new: true })
    .then(house => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(house);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    House.findByIdAndDelete(req.params.houseId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err=> next(err))
});

{ /*
houseRouter.route('/:houseId/appliances')
.get((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(house.appliances);
        } else {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 404;
            return next(err)
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house) {
            house.appliances.push()
        }
    })
})
*/}

houseRouter.route('/:houseId/maintenanceorders')
.get((req, res, nest) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(house.maintenanceorders);
        } else {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house) {
            house.maintenanceorders.push(req.body);
            house.save()
            .then(house => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(house);
            })
            .catch(err => next(err))
        } else {
            err = new Error(`House ${req.params.houseId} not Found!`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT OPERATION NOT SUPPORTED ON /houses/${req.params.houseId}/maintenanceorders`);
})
.delete((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house) {
            for (let i = (house.maintenanceorders.length - 1); i>= 0; i--) {
                house.maintenanceorders.id(house.maintenanceorders[i]._id).remove();
            }
            house.save()
            .then(house => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(house);
            })
            .catch(err => next(err));
        } else {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
});

houseRouter.route('/:houseId/maintenanceorders/:maintenanceorderId')
.get((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house && house.maintenanceorders.id(req.params.maintenanceorderId)) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(house.maintenanceorders.id(req.params.maintenanceorderId));
        } else if (!house) {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 404;
            return next(err);
        } else {
            err = new Error(`Maintenance Order ${req.params.maintenanceorderId} not found!!!`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST OPERATION NOT SUPPORTED ON /houses/${req.params.houseId}/maintenanceorders/${req.params.maintenanceorderId}`);
})
.put((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house && house.maintenanceorders.id(req.params.maintenanceorderId)) {
            if (req.body.completed) {
                house.maintenanceorders.id(req.params.maintenanceorderId).completed = req.body.completed;
            }
            if (req.body.closingnotes) {
                house.maintenanceorders.id(req.params.maintenanceorderId).closingnotes = req.body.closingnotes;
            }
            house.save()
            .then(house => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(house);
            })
            .catch(err => next(err));
        } else if (!house) {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 404;
            return next(err);
        } else {
            err =  new Error(`Maintenance Order ${req.params.maintenanceorderId} not found!!!`);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    House.findById(req.params.houseId)
    .then(house => {
        if (house && house.maintenanceorders.id(req.params.maintenanceorderId)) {
            house.maintenanceorders.id(req.params.maintenanceorderId).remove();
            house.save()
            .then(house => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(house);
            })
            .catch(err => next(err));
        } else if (!house) {
            err = new Error(`House ${req.params.houseId} not found!!!`);
            err.status = 400;
            return next(err);
        } else {
            err = new Error(`Maintenance Order ${req.params.maintenanceorderId} not found!!!`);
            err.status = 400;
            return next(err);
        }
    })
    .catch(err => next(err));
});

module.exports = houseRouter;