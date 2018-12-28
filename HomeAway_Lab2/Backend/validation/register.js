const Validator = require ('validator');
const isEmpty = require('./is-empty');
module.exports = function validateRegisterInput(data){
    let errors = {};
    data.lastname = !isEmpty(data.lastname) ? data.lastname :'';
    data.firstname = !isEmpty(data.firstname) ? data.firstname :'';
    data.email = !isEmpty(data.email) ? data.email :'';
    data.password = !isEmpty(data.password) ? data.password :'';

    if(!Validator.isLength(data.lastname , {min: 2 , max: 30})){
        errors.lastname  = 'Last Name must be between 2-30 characters'
    }
    if(Validator.isEmpty(data.lastname)){
        errors.lastname  = 'Last Name cannot be empty'
    }
    if(!Validator.isLength(data.firstname , {min: 2 , max: 30})){
        errors.firstname  = 'First Name must be between 2-30 characters'
    }
    if(Validator.isEmpty(data.firstname)){
        errors.firstname  = 'First Name cannot be empty'
    }
    if(Validator.isEmpty(data.email)){
        errors.email  = 'Email cannot be empty'
    }
    if(!Validator.isEmail(data.email)){
        errors.email  = 'Email is invalid'
    }
    if(Validator.isEmpty(data.password)){
        errors.password  = 'Password cannot be empty'
    }
    if(!Validator.isLength(data.password , {min: 6 , max: 30})){
        errors.firstname  = 'Password must be at least 6 characters'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}