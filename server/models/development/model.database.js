const {existsSync, readFileSync, writeFileSync} = require('fs');

class DataBase {
    _options;

    _database;

    /**
     * @param {{autoSave: Boolean, timeForAutoSave: Number, root: String}} options
     */
    constructor (options) {
        this._options = options;
    }

    main() {
        if (!this._options['root'] || !existsSync(this._options['root'])) this.error('the path of root does not exist or root is available !');
        this._database = JSON.parse(readFileSync(this._options.root, {encoding: "utf-8"}));
        if (this._options['autoSave'] && this._options['timeForAutoSave']) setInterval(() => {this.save()}, this._options.timeForAutoSave * 1000)
        return this;
    }

    error(message) {
        console.error(new Error(message))
        process.exit(1)
    }

    save() {
        writeFileSync(this._options.root, JSON.stringify(this._database), {encoding: "utf-8"});
    }

    set database(database) {
        this._database = database;
    }

    get database() {
        return this._database;
    }
}
module.exports = DataBase;