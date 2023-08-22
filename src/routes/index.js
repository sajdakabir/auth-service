const initRoutes = (app) => {
  app.get("/", async (req, res) => {
    res.json({
      message: "Welcome to pet Project Developer Portal",
    });
  });
};

export{
    initRoutes
}