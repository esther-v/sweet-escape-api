const database = require('../config/database');

exports.createTip = (user_id, tip, callback) => {
    database.query(`INSERT INTO tips(place_name, description, city, country, publish, type, user_id) VALUES (?, ?, ?, ?, ?, ?, ?);`, [tip.place_name, tip.description, tip.city, tip.country, new Date(), tip.type, user_id], (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }

        callback(null, result);
    })
}

exports.modifyTip = (id, infos, callback) => {
    database.query(`UPDATE places SET place_name="${infos.place_name}", description="${infos.description}" WHERE id_tip=${id};`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
          }
          callback(null, result); 
    })
}

exports.getDetails = (id, callback) => {
    database.query(`SELECT * from tips where id_tip=${id};`, (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.deleteOneTip = (id, callback) => {
    database.query(`DELETE FROM tips WHERE id_tip = ?;`, [id], (error, result) => {
      if (error) {
        console.log("error: ", error);
        callback(error, null);
        return;
      }
      callback(null, result);
    })
  }

exports.getRecentTips = (callback) => {
    database.query(`SELECT users.firstname,tips.place_name, tips.description, tips.publish, tips.city, tips.country, tips.type, DATE_FORMAT(publish, "%d  %M  %Y" )AS "date" FROM tips INNER JOIN users ON users.id_user = tips.user_id ORDER BY id_tip DESC LIMIT 3;`, (error, result) => {
        if (error) {
            console.log("error: ", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}

exports.city = (city, type, callback) => {
    let requete = type ? `SELECT * FROM tips WHERE city = ? AND type = ?;` : `SELECT * FROM tips WHERE city = ?;`
    database.query(requete, [city, type], (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.country = (country, type, callback) => {
    let requete = type ? `SELECT * FROM tips WHERE country = ? AND type = ?;` : `SELECT * FROM tips WHERE country = ?;`
    database.query(requete, [country, type], (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        } 
        callback(null, result);
    })
}

exports.getMyTips = (user_id, callback) => {
    database.query(`SELECT * FROM tips WHERE user_id = ?;`, [user_id], (error, result) => {
        if (error) {
            console.log("error :", error);
            callback(error, null);
            return;
        }
        callback(null, result);
    })
}