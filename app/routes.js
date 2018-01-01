// ------------------ Controllers

var Users       = require("./controllers/users.controller")
var Products    = require("./controllers/products.controller")
var Sells       = require("./controllers/sells.controller")

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
        if (req.session.logged) {
            Products.find(function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
     
    app.get("/api/getproviders", function (req, res) {
        if (req.session.logged) {
            Products.findProviders(function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
     
    app.post("/api/inproducts", function (req, res) {
        if (req.session.logged) {
            Products.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
    
    app.post("/api/getproduct", function (req, res) {
        if (req.session.logged) {
            Products.findOne(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
    
    app.put("/api/upproduct", function (req, res) {
        if (req.session.logged) {
            Products.update(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
    
    app.put("/api/disproduct", function (req, res) {
        if (req.session.logged) {
            Products.disable(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Sells
     * --------------------------------------------------------------------------
     */
     
    app.get("/api/findproductsinfo", function (req, res) {
        if (req.session.logged) {
            Sells.findProductsInfo(function (results) {
                res.json(results)
            })
        } else {
            res.json({})
        }
    })
    
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}