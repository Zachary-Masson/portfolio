const express = require('express')

class Route {
    _path;
    _name;

    constructor() {
        this._path = '/'
        this._name = "Index"
    }

    main(ModelDatabase) {
        const route = express.Router();

        route.get('/try', (req, res) => res.send('try is success'))

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