const express = require('express')
const ControllerUtils = require('../controllers/controller.utils');

class Route {
    _path;
    _name;

    constructor() {
        this._path = '/utils'
        this._name = "Utils"
    }

    main(ModelDatabase) {
        const route = express.Router();
        const Controller = new ControllerUtils()

        route.get('/try', (req, res) => res.send('try is success'))

        route.get('/getStats', Controller.getStats.bind(this, ModelDatabase))

        route.post('/addViews', Controller.addViews.bind(this, ModelDatabase))

        return route;
    }

    // getters

    get path() {
        return this._path;
    }

    get name() {
        return this._name;
    }
}

module.exports = Route;