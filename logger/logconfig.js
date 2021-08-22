const loggerModel = require('../models/logger');

var loggerConfigModel = class LoggerConfigModel {
    static async info(message) {
        await loggerModel.logInfo(message);
    }

    static async error(message) {
        await loggerModel.logError(message);
    }

    static async warn(message) {
        await loggerModel.logWarning(message);
    }
}

module.exports = loggerConfigModel;
