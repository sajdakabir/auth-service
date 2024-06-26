import { User } from "../models/user.model.js";
import { generateHash, verifyPasswordHash, generateRandomPassword } from "../utils/helper.service.js";
import generator from "crypto-random-string";

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
    const token = generator({
        length: 36,
        type: "url-safe"
    })
    let user = await getUserByEmail(email);
    let isNewUser = false;
    if (!user) {
        isNewUser = true;
        const userName = email.split('@')[0];
        user = await createEmailUser({ fullName: email, userName, email, password: generateRandomPassword() })
    }

    await LoginLink.create({
        token,
        type: "login",
        user: user._id
    })
    return { 
        ok: "ok",
        token,
        isNewUser
     };
}

const getUserById = async (id) => {
    const user = await User.findOne({
        uuid: id
    }, {
        'accounts.local.password': 0,
        updatedAt: 0,
        __v: 0
    })
    if (!user) {
        const error = new Error("User does not exist")
        error.statusCode = 404;
        throw error
    }
    return user;
}


const validateMagicLoginLink = async (token) => {
    // TODO: Add expiry time
    const magicLink = await LoginLink.findOne({
        token,
        isRevoked: false
    }).populate({
        path: "user",
        select: "fullName uuid"
    })
    if (!magicLink) {
        const error = new Error("Invalid Magic Link")
        error.statusCode = 404;
        throw error;
    }
    return magicLink;
}

export {
    createEmailUser,
    validateEmailUser,
    createMagicLoginLink,
    getUserById,
    validateMagicLoginLink
}