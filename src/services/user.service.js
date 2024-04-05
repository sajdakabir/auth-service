import { User } from "../models/user.model.js";
import { generateHash, verifyPasswordHash } from "../utils/helper.service.js";

const getUserByEmail = async (email) => {
    const user = await User.findOne({
        $or: [
            {
                email
            },
            ...(email ? [{
                "accounts.google.email": email
            }] : []),
            ...(email ? [{
                "accounts.local.email": email
            }] : [])
        ]

    })
    return user
}

const createEmailUser = async ({
    name,
    userName,
    email,
    password
}) => {
    let user = await getUserByEmail( email);
    if (user) {
        const error = new Error ("User already exists");
        error.statusCode = 400;
        throw error;
    }

    const hash = await generateHash(password);
    user = await User.create({
        name,
        userName,
        accounts: {
            local: {
                email,
                password: hash
            }
        }
    })
    return user;
}

const validateEmailUser = async (email, password) => {
    const user = await User.findOne({
        'accounts.local.email': email
    })
    if (!user) {
        const error = new Error("Invalid email or password")
        error.statusCode = 401;
        throw error
    }
    const verifyPassword = await verifyPasswordHash(password, user.accounts.local.password);
    if (!verifyPassword) {
        const error = new Error("Invalid email or password")
        error.statusCode = 401;
        throw error
    }
    return user
}

const createMagicLoginLink = async (email, redirectUrl) =>{
    

}

export {
    createEmailUser,
    validateEmailUser,
    createMagicLoginLink
}