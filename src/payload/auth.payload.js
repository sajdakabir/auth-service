import Joi from 'joi';

const RegisterPayload = Joi.object({
    name: Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required()
})

export {
    RegisterPayload
}