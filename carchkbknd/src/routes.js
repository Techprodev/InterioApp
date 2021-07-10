const AuthController       = require('./controllers/AuthController')
const AuthControllerPolicy = require('./policies/AuthControllerPolicy')

module.exports = (app) => {    
  app.post('/register', 
    AuthControllerPolicy.register,
    AuthController.register)

  app.get('/status', (req, res) => {
    res.send({
      message: 'Hello from status path'
    })
  })
  app.use("/", (req, res) => {
    return res.send("Hello! Home path RNR from sample Node JS API");
  })
}

