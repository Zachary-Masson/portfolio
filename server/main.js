const wwwClass = require('./bin/www');
const Router = require('./models/model.router');
const ModelDatabase = require('./models/development/model.database');

const www = new wwwClass(__dirname).main();
new Router().initializeRoutes(__dirname, www.application, new ModelDatabase({root: `${__dirname}/database.json`}).main());
