const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const User = require("../models/model");

exports.home = (request, response) => {   
    response.send ("hello world");
}

exports.newAccount = (request, response) => {
  User.getUserByEmail(request.body, (error, result) => {
    const { firstname, email, password, birthday, country, description } = request.body;
    
      if (error) {
      response.send(error.message);
      } 
      else if (result.length > 0) {
          response.status(400).json({message: "Un utilisateur avec le même email existe déjà" })                     
      } 
      else {
              if ( !firstname || !email || !password || !birthday || !country) {
                  response.status(400).json({message: "Un champ obligatoire n'est pas renseigné"})
              } else {
              const saltRounds = 10;
              bcrypt.hash(request.body.password, saltRounds, (error, encryptedPassword) => {
                  if (error) {
                  response.send(error.message);
                  } 
                  User.createAccount(request.body, encryptedPassword, (error, result) => {
                      if (error) {
                      response.send(error.message);
                      } else {
                      response.status(201).json({message: "Success"})
                      }
                  });
              });
          }
      }
  })
}

exports.login = async (request, response) => {  
  const email = request.body.email;
  const password = request.body.password;
  if (!email || !password ){
      await response.send ("Veuillez rentrer tous les champs")
  }
  else {
      User.getUserByEmail(request.body, async (error, result) => {
          if (error) {
              response.send(error.message);
          }
          else if (result.length === 0) {
              await response.status(401).json({ error: 'Utilisateur non trouvé !' });
          }
          else {
              const hash = result[0].password;
              bcrypt.compare(password, hash, async (error, correct) => {
                  if (error) {
                      response.send(error.message);
                  }
                  else if (!correct) {
                      await response.status(401).json({ error: 'Mot de passe incorrect !' });
                  }
                  else {
                      const user = {
                          firstname: result[0].firstname,
                          email : result[0].email, 
                          country : result[0].country, 
                          userId: result[0].id_user                    
                      }
                      jwt.sign(user, secret, {expiresIn: "24h"}, (error, token) => {
                          if (error) {
                              response.send(error.message);
                          }
                          else {
                              request.user = {
                                  firstname: result[0].firstname,
                                  email : result[0].email, 
                                  country : result[0].country, 
                                  userId: result[0].id_user  
                              };
                              console.log(token)
                              response.status(200).json(
                                  { token: token, 
                                      user: {
                                          firstname: user.firstname,
                                          email: user.email,
                                          country: user.country,
                                          userId: user.userId,
                                      } });    
                          }
                      });
                  }
              });
          }
      });
  }
} 

exports.profile = (request, response) => {
    const { userId } = request.user;
    User.getProfile(userId, (error, result)=> {
        if (error) {
            response.send(error.message);
        } else {
            response.status(200).json({message: "Success", result: result})
        }
    })
}