const  express = require('express');
const userController = require('../controller/userController');

var router = express.Router();

/**
 * @typedef User
 * @property {string} useremail.required
 * @property {string} userpassword.required
 */

/**
 * @typedef UserDate
 * @property {integer} userId
 * @property {string} username.required - login username of the user
 * @property {string} password.required - login password of the user
 * @property {string} firstname.required - firstname of the user
 * @property {string} lastname.required - lastname of the user
 * @property {string} phone.required - contact numbner of the user
 */

/**
 * @typedef UserInfo
 * @property {UserDate.model} requestInfo.required - requestInfo of the user
 */

/**
 * This function comment is parsed by doctrine
 * @route post /api/v1/user/update
 * @group User - Get signin user 
 * @param {UserInfo.model} RequestInfo.body.required - Get userInfo data from server
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {Array.<object>} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 */

router.post('/update', userController.apiUpdateUser);


/**
 * This function comment is parsed by doctrine
 * @route POST /api/v1/user/login
 * @group User - Transact carrier data
 * @param {User.model} user.body.required - Send carrier data to remote server
 * @produces application/json application/xml
 * @consumes application/json application/xml
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.post('/login', userController.apiValidateUserByEmail);

module.exports = router;