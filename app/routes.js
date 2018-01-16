// ------------------ Controllers

var Users           = require("./controllers/users.controller")
var Products        = require("./controllers/products.controller")
var Sells           = require("./controllers/sells.controller")
var Offers          = require("./controllers/offers.controller")
var Spendings       = require("./controllers/spendings.controller")
var ExtraIncomes    = require("./controllers/extraincomes.controller")
var Reports         = require("./controllers/reports.controller")
var Alerts          = require("./controllers/alerts.controller")

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
            res.json([])
        }
    })
     
    app.get("/api/getproviders", function (req, res) {
        if (req.session.logged) {
            Products.findProviders(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
     
    app.post("/api/inproducts", function (req, res) {
        if (req.session.logged) {
            Products.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/getproduct", function (req, res) {
        if (req.session.logged) {
            Products.findOne(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/upproduct", function (req, res) {
        if (req.session.logged) {
            Products.update(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/disproduct", function (req, res) {
        if (req.session.logged) {
            Products.disable(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/delproduct", function (req, res) {
        if (req.session.logged) {
            Products.remove(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Sells
     * --------------------------------------------------------------------------
     */
     
    app.get("/api/findinternalcodeandname", function (req, res) {
        if (req.session.logged) {
            Sells.findInternalCodeAndName(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/findproductinfobycode", function (req, res) {
        if (req.session.logged) {
            Sells.findProductInfoByCode(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/findproductinfobyname", function (req, res) {
        if (req.session.logged) {
            Sells.findProductInfoByName(req.body.name, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/insell", function (req, res) {
        if (req.session.logged) {
            Sells.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/getsells", function (req, res) {
        if (req.session.logged) {
            Sells.find(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/delsell", function (req, res) {
        if (req.session.logged) {
            Sells.remove(req.body.internalCode, req.body.products, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Offers
     * --------------------------------------------------------------------------
     */
    
    app.post("/api/findproductinfopricebycode", function (req, res) {
        if (req.session.logged) {
            Offers.findProductInfoPriceByCode(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/findproductinfopricebyname", function (req, res) {
        if (req.session.logged) {
            Offers.findProductInfoPriceByName(req.body.name, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/inoffer", function (req, res) {
        if (req.session.logged) {
            Offers.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/getoffers", function (req, res) {
        if (req.session.logged) {
            Offers.find(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/deloffer", function (req, res) {
        if (req.session.logged) {
            Offers.remove(req.body.internalCode, req.body.internalCodeProduct, req.body.originalPrice, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Spendings
     * --------------------------------------------------------------------------
     */
     
    app.post("/api/inspending", function (req, res) {
        if (req.session.logged) {
            Spendings.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/getspendings", function (req, res) {
        if (req.session.logged) {
            Spendings.find(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/delspending", function (req, res) {
        if (req.session.logged) {
            Spendings.remove(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Extra Incomes
     * --------------------------------------------------------------------------
     */
     
    app.post("/api/inextraincome", function (req, res) {
        if (req.session.logged) {
            ExtraIncomes.insert(req.body, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("/api/getextraincomes", function (req, res) {
        if (req.session.logged) {
            ExtraIncomes.find(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.put("/api/delextraincome", function (req, res) {
        if (req.session.logged) {
            ExtraIncomes.remove(req.body.internalCode, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Reports
     * --------------------------------------------------------------------------
     */
     
    app.get("/api/findallproductsinsells", function (req, res) {
        if (req.session.logged) {
            Reports.findAllProductsInSells(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/findallproductsinsellsbetweendates", function (req, res) {
        if (req.session.logged) {
            Reports.findAllProductsInSellsBetweenDates(req.body.firstDate, req.body.lastDate, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/findallsellsbetweendates", function (req, res) {
        if (req.session.logged) {
            Reports.findAllSellsBetweenDates(req.body.firstDate, req.body.lastDate, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.post("/api/getsummarydata", function (req, res) {
        if (req.session.logged) {
            Reports.getSummaryData(req.body.firstDate, req.body.lastDate, function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    /* 
     * --------------------------------------------------------------------------
     * Alerts
     * --------------------------------------------------------------------------
     */
     
    app.get("/api/findlowstockproducts", function (req, res) {
        if (req.session.logged) {
            Alerts.findStockInfo(function (results) {
                res.json(results)
            })
        } else {
            res.json([])
        }
    })
    
    app.get("*", function (req, res) {
        res.sendFile("index.html", {root: __dirname + "/../public/"})
    })
}