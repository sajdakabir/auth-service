import { User } from "../models/user.model.js";
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
}


export {
    createEmailUser
}