const database = require('../config/database');

exports.getUserByEmail = (requestBody, callback) => {
    database.query("SELECT * FROM users WHERE email = ?;", [requestBody.email], (error, result) => {

        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    });
}

exports.createAccount = (requestBody, encryptedPassword, callback) => {
    database.query(`INSERT INTO users(firstname, email, password, birthday, country, description)
    values("${requestBody.firstname}", "${requestBody.email}", "${encryptedPassword}", "${requestBody.birthday}", "${requestBody.country}", "${requestBody.description}");`, (error, result) => {
        if (error){
            callback(error, null);
            return;
        }

        callback(null, result);
    });
}

exports.getProfile = (id_user, callback) => {
    database.query(`SELECT firstname, email, birthday, country_user, description FROM users WHERE id_user = ?;`, [id_user], (error, result) => {
        if (error) {
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}