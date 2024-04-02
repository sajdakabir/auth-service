import { User } from "../models/user.model.js";
import { generateHash } from "../utils/helper.service.js";

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


export {
    createEmailUser
}