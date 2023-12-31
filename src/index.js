import express from 'express';
import cors from "cors";
import { initRoutes } from './routes/index.js';

const app = express()
app.use(cors())
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
initRoutes(app)

export {
    app,
    express
}
