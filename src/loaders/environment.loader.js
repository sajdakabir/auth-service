import { config } from 'dotenv';

config()

export const environment = {
    PORT: process.env.PORT || 8001,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,
}