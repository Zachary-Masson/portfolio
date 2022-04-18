class ModelUtils {
    ModelDatabase;

    constructor(ModelDatabase) {
        this.ModelDatabase = ModelDatabase;
    }

    addViews() {
        const db = this.ModelDatabase.database;
        db.stats.views += 1;
        this.ModelDatabase.database = db;
        this.ModelDatabase.save();
    }
}

module.exports = ModelUtils;