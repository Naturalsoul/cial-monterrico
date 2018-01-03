const bcrypt = require("bcrypt")
let Users = require("../models/users.model")

module.exports = {
    checkUser: function (userName, password, next) {
        Users.findOne({name: userName}, function (err, data) {
            if (err) {
                throw err
            }
            
            if (data != null) {
                bcrypt.compare(password, data.pass, function (err, data) {
                    if (err) {
                        throw err
                    }
                    
                    if (data != null) {
                        next(true)
                    } else {
                        next(false)
                    }
                })
            } else {
                next(false)
            }
        })
    },
    
    isLogged: function (session, next) {
        if (session.logged) {
            next({logged: true})
        } else {
            next({logged: false})
        }
    },
    
    signup: function (userName, password, next) {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                throw err
            }
            
            let newUser = new Users({name: userName, pass: hash})
            
            newUser.save()
            
            next({registered: true})
        })
    }
}