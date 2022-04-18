const {readdirSync} = require('fs');

const CONFIG = require('../config.json');
const debugModel = require('../models/development/model.debug');

class Router {
    constructor() {}

    initializeRoutes(dirname, application, ModelDatabase) {
        const routesFiles = readdirSync(`${dirname}/routes`).filter(f => f.startsWith('route.') && f.endsWith('.js'))
        const debug = new debugModel('Initialisation des Routes');
        debug.createCategory();
        routesFiles.map(fileName => {
            const routeClass = require(`${dirname}/routes/${fileName}`);
            const route = new routeClass();
            application.use(route.path, route.main(ModelDatabase));
            debug.message = CONFIG.debug.messages.add_route.replaceAll('{{ route.name }}', route.name)
            debug.create('add_route');
        })
    }
}

module.exports = Router;


