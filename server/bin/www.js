const ENV = require('dotenv').config().parsed;
const CONFIG = require('../config.json');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const debugModel = require('../models/development/model.debug');

class wwwClass {
    _port
    _message;
    _application;
    _dirname

    constructor(dirname){
        this._port = ENV.PORT;
        this._dirname = dirname;
    }

    main() {
        this.createApplication();
        this.initCors();
        this.initBodyParser();
        this.initAssets();
        this.listen()
        return this;
    }

    createApplication() {
        return this._application = express();
    }

    initCors() {
        return this._application.use(cors());
    }

    initBodyParser() {
        this._application.use(bodyParser.json());
        this._application.use(bodyParser.urlencoded({extended: true}))
    }

    initAssets() {
        this._application.use('/assets/', express.static(`${this._dirname}/public/`))
    }

    listen() {
        this._application.listen(this._port, () => {
            const debug = new debugModel("Lancement de l'application");
            debug.createCategory();
            debug.message = CONFIG.debug.messages['launch_application'].replaceAll('{{ port }}', this._port);
            debug.create('launch_application');
        });
    }

    get application() {
        return this._application;
    }
}

module.exports = wwwClass;