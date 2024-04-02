import { createConnection } from "mongoose";
import { environment } from "./environment.loader.js";

const db = createConnection(`mongodb+srv://${environment.DB_USER}:${environment.DB_PASS}@${environment.DB_HOST}/${environment.DB_NAME}`, {
    autoIndex: false
})

export { db }