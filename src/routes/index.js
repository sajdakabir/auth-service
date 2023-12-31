import AuthRouter from './core/auth.route.js'
const initRoutes = (app) => {
    app.use('/auth', AuthRouter);
    app.get('/', async (req, res) => {
        res.json({
            "message": "Welcome to Auth Service Developers Portal"
        })
    })
    app.use('*', (req, res) => {
        res.status(404).json({
            "status": 404,
            "message": "Invalid route"
        })
    })
}

export {
    initRoutes
}