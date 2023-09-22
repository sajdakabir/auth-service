const initRoutes = (app) => {
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