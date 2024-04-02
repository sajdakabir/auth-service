import Joi from 'joi';
import { RegisterPayload } from "../payload/auth.payload.js";
import { createEmailUser } from "../services/user.service.js";
import { generateJWTTokenPair } from "../utils/jwt.service.js";

const { ValidationError } = Joi;

const registerEmailUserController = async (req, res, next) => {
       try {
        const { name, username, email, password } = await  RegisterPayload.validateAsync({ name: req.body.name,username: req.body.username, email: req.body.email, password: req.body.password });

        const user = await createEmailUser({
            name,
            username,
            email,
            password
        })
        if (!user) {
            throw new Error ("Failed to create user");
        }
        const { ok, isNewUser } = await generateJWTTokenPair(user);
        res.status(200).json({
            statusCode: 200,
            response: {
                ok,
                isNewUser
            }
        })
        // TODO: Send welcome email and verify email template to user
       } catch (err) {
            const error = new Error(err)
            error.statusCode = err instanceof ValidationError ? 400 : (err.statusCode || 500)
            next(error);
       }
}

export {
    registerEmailUserController
}