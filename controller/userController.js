const userService = require('../services/user');
const logger = require('../logger/logconfig');


exports.apiValidateUserByEmail = async (req, res, next) => {
    const useremail = req.body.useremail;
    const userpassword = req.body.userpassword;

    try {
        if(useremail === '' || useremail === undefined) {
            return res.json({status: 'false', message:'User email is required'});
        }
    
        if(userpassword === '' || userpassword === undefined) {
            return res.json({status: 'false', message:'User email is required'});
        }
    
        var userResponse = await userService.validateUser(useremail, userpassword);
        if((userResponse !== undefined || userResponse !== '') && userResponse.status) {
            return res.json({status: 'true', message: '', result: userResponse.user});
        }
        else{
            return res.json({status: 'false', message: userResponse.message});
        }
    } catch (error) {
        logger.error(`Unable to validate user: ${error.message}`);
        return res.json({status: 'false', message:`Unable to validate user: ${error.message}`});
    }

}

exports.apiFetchUserByEmail =  (req, res, next) => {

}

exports.apiUpdateUser = async (req, res, next) => {
    const requestInfo = req.body.requestInfo;
    
    
    try {
        var userResponse = await userService.updateUser(requestInfo);
        if(userResponse !== undefined || userResponse !== '' && userResponse.status) {
            return res.json({status: 'true', message: '', result: userResponse.result});
        }
        else{
            return res.json({status: 'false', message: userResponse.message});
        }


    } catch (error) {
        logger.error(`Unable to update user: ${error.message}`);
        return res.json({status: 'false', message:`Unable to update user: ${error.message}`});
    }
}