const logger = require('../logger/logconfig');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');


var userService = class UserService {

    /***********************************************
    *
    * Get user by email
    *
    ************************************************/
     static async fetchUser(email) {
        var [userResponse] = await userModel.fetchUser(email);
        if(userResponse !== undefined && userResponse !== null && userResponse.length > 0 && userResponse[0].length > 0){
            return {status: true, message: ``, user: userResponse[0]};
        }
        else{
            return {status: false, message: `unable to fetch user`, };
        }
     }

    /***********************************************
    *
    * validate user by email
    *
    ************************************************/
     static async validateUser(email, password) {
         try {
            var [userResponse] = await userModel.fetchUser(email);
            if(userResponse !== undefined && userResponse !== null && userResponse.length > 0 && userResponse[0].length > 0){
                const user = userResponse[0][0];

                //please check whether this user is Locked

                if (await bcrypt.compare(password, user.password)) {

                    //const guid = uuidv4();
                    var token = generateToken(user);
                    user.token = token;
                    return {status: true, message: ``, user: user};
                }
                logger.info(`user id: ${email}, Password ${password}, hashed password: ${user.password}`);
                //userModel.updateUserLogin(email);
                return {status: false, message: `Invalid password`};
            }
            else{
                return {status: false, message: `Oops, No such user exist`, };
            }
                
         } catch (error) {
            logger.error(`Error on authenticate user : ${error.stack}`);
            return { status: false, message: error.message };
         }
     }
     
     

    /***********************************************
    *
    * Update user by email
    *
    ************************************************/

     static async updateUser(requestInfo) {

        var hashPassword = await bcrypt.hash(requestInfo.password, 10); //encryption
        requestInfo.hashPassword = hashPassword;
        var [userupdateResponse] = await userModel.updateUser(requestInfo);
        if(userupdateResponse !== undefined && userupdateResponse !== null && userupdateResponse.length > 0 && userupdateResponse[0].length > 0){
            if(userupdateResponse[0][0].responseId > 0){
                return {status: true, message: ``, result: 'User has been updated successfully'  };    
            }
            return {status: false, message: `failed to update user`, };
        }
        else{
            return {status: false, message: `failed to update user`, };
        }
     }
}


function generateToken(user) {

    const signature = process.env.JWT_SECRET_KEY;
    const expiration = process.env.JWT_TOKEN_EXPIRATION;

    const data = {
        _id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        org_id: user.org_id,
        roleid: user.roleid,
        expiry: expiration
    };

    return jwt.sign({ data, }, signature, { expiresIn: expiration });
}

module.exports = userService;