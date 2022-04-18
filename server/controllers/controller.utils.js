const ModelUtils = require('../models/model.utils');

class ControllerUtils {
    constructor() {
    }

    addViews(ModelDatabase, req, res) {
        const Utils = new ModelUtils(ModelDatabase);
        Utils.addViews();
        res.send('OK')
    }

    getStats(ModelDatabase, req, res) {
        res.send(ModelDatabase.database.stats)
    }
}
module.exports = ControllerUtils