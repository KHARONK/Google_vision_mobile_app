const Joi = require('joi');

const validateUserSignupInput = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});


const validateUserLoginInput = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

module.exports = {
    validateUserSignupInput,
    validateUserLoginInput
}