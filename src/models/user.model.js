import { Schema } from "mongoose";
import { v4 as uuid } from "uuid";
import { db } from "../loaders/db.loader.js";

const UserSchema = new Schema({
    uuid: {
        type: String,
        default: () => uuid()
    },
    name: {
        type: Schema.Types.String
    },
    userName: {
        type: Schema.Types.String
    },
    avatar: {
        type: Schema.Types.String,
        default: ''
    },
    roles: {
        type: Schema.Types.Array,
        default: ["user"]
    },
    accounts: {
        local:{
            email: {
                type: Schema.Types.String,
                validate : (e) => {
                    return /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(e)
                }
            },
            password: {
                type: Schema.Types.String
            },
            isVerified: {
                type: Schema.Types.Boolean,
                default: false
            }
        },
        google: {
            email: {
                type: Schema.Types.String,
                validate: {
                    validator: (e) => {
                        return /^[a-z0-9][a-z0-9-_.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(e)
                    }
                }
            }
        },
    },
    isVerified: {
        type: Schema.Types.Boolean,
        default: false
    },
    hasAuthorizedEmail: {
        type: Schema.Types.Boolean,
        default: false
    }
}, {
    timestamps: true
});

const User= db.model('User', UserSchema, 'users')

export{
    User
}
