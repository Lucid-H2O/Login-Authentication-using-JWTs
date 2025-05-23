const mongoose = require('mongoose');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    firstName:{ type:String, required: true},
    lastName:{ type:String, required: true},
    email:{ type:String, required: true},
    password:{ type:String, required: true},
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({id: this._id, email: this.email }, process.env.PRIVATEACCESSKEY, {expiresIn:"1d"});
    return token
}

const User = mongoose.model("user", userSchema);

const validate = (data) =>{
    const schema = joi.object({
        firstName: joi.string().required().label('First Name'),
        lastName: joi.string().required().label('Last Name'),
        email: joi.string().required().label('Email'),
        password: passwordComplexity().required().label('Password'),
    });
    return schema.validate(data)
};


module.exports = {User, validate}