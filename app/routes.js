// ------------------ Controllers

var Users       = require("./controllers/users.controller")
var Products    = require("./controllers/products.controller")

// ------------------

module.exports = function (app) {
    
    /* 
     * --------------------------------------------------------------------------
     * Access
     * --------------------------------------------------------------------------
     */
    
    app.get("/api/login/check", function (req, res) {
        Users.isLogged(req.session, function (results) {
            res.json(results)
        })
    })
    
    app.post("/api/login", function (req, res) {
        Users.checkUser(req.body.userName, req.body.password, function (results) {
            if (results) {
                req.session.logged = true
                res.json({logged: true})
            } else {
                res.json({logged: false})
            }
        })
    })
    
    app.post("/api/signup", function(req, res) {
        Users.signup(req.body.userName, req.body.password, function (results) {
            res.json(results)
        })
    })
    
    app.get("/api/logout", function (req, res) {
        delete req.session.logged
        res.json({logged: false})
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Products
     * --------------------------------------------------------------------------
     */
     
    app.get("/api/getproducts", function (req, res) {
        Products.find(function (results) {
            res.json(results)
        })
    })
     
    app.get("/api/getproviders", function (req, res) {
        Products.findProviders(function (results) {
            res.json(results)
        })
    })
     
    app.post("/api/inproducts", function (req, res) {
        Products.insert(req.body, function (results) {
            res.json(results)
        })
    })
    
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}