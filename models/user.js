const mysql = require('mysql2');
const dbconfig = require('../config/dbconfig');
const logger = require('../logger/logconfig');
const moment = require('moment');

var userModel = class User {


    /***********************************************
    *
    * Get user by email
    *
    ************************************************/
    static async fetchUser(username) {
        try {
            var procedureQuery = mysql.format('call proc_get_user(?)', [username]);
            logger.info(procedureQuery);
            var queryResult = await dbconfig.query(procedureQuery);
            return queryResult;

        } catch (error) {
            logger.error(JSON.stringify(error));
            throw error;
        }
    }


    /***********************************************
    *
    * Update user by email
    *
    ************************************************/
     static async updateUser(requestInfo) {
         var createdon = moment().format('YYYY-MM-DD HH:mm:ss');
        try {
            var procedureQuery = mysql.format('call proc_update_user(?, ?, ?, ?, ?, ?, ?, ?)', [ 
                requestInfo.userId, 
                requestInfo.guid === undefined || requestInfo.guid === null ? '' : requestInfo.guid, 
                requestInfo.username, 
                requestInfo.hashPassword, 
                requestInfo.firstname, 
                requestInfo.lastname, 
                requestInfo.phone, 
                createdon
            ]);
            
            logger.info(procedureQuery);
            var queryResult = await dbconfig.query(procedureQuery);
            return queryResult;

        } catch (error) {
            logger.error(JSON.stringify(error));
            throw error;
        }
    }

}

module.exports = userModel;
