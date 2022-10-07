const dbo = require("./db/conn");

DAO = {};

DAO.verifyPotentialUser = function (email, code) {
    let db_connect = dbo.getDb();

    const searchObj = {
        email: email,
        code: Number(code)
    }
    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").findOne(searchObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result != null)
            }
        });
    });
}

DAO.addPotentialUser = async function (email, code) {
    let db_connect = dbo.getDb();
    
    let dbobj = {
        email: email,
        code: Number(code)    
    };

    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").insertOne(dbobj, (err, result) => {
            if (err) throw rej(err);
            res(result);
        });
    })
}

DAO.removePotentialUser = function (email, code) {
    let db_connect = dbo.getDb();
    
    let dbobj = {
        email: email,
        code: Number(code)    
    };

    return new Promise( (res, rej) => {
        db_connect.collection("potentialUsers").removeOne(dbobj, (err) => {
            if (err) throw rej(err);
            res(result);
        });
    })
}

DAO.findUser = function (email) {
    let db_connect = dbo.getDb();

    let userObj = {
        email: email
    }

    return new Promise( (res, rej) => {
        db_connect.collection("users").findOne(userObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
            }
        });
    })
}

DAO.addUser = async function (email, password) {
    let db_connect = dbo.getDb();

    let userObj = {
        email: email,
        password: password,
        accountType: "student"
    }

    if (await DAO.findUser(email) != null) { // User already found
        return async () => {}; // Empty promise ;-;
    }

    return new Promise( (res, rej) => {
        db_connect.collection("users").insertOne(userObj, (err, result) => {
            if (err) {
                rej(err)
            } else {
                res(result)
            }
        });
    })
}

module.exports = DAO;