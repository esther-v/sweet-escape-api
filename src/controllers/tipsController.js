const Tips = require("../models/tips");

exports.addOne = (request, response) => {
    const { userId } = request.user;
    const {place_name, description, city, country, type} = request.body;
    console.log(userId);
    if (!place_name || !description || !city || !country || !type ) {
        return response.status(400).json({message: "Missing input"})
    }
    Tips.createTip(userId, request.body, (error, result) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(201).json({message: "Creation success" })
        }
    })
}

exports.updateTip = (request, response) => {
    const {id_tip} = request.params;
        Tips.modifyTip(id_tip, request.body, (error, result) => {
            if (error) {
                response.send (error.message);
            }
            else {
                response.status(200).json({message: "modification ok", result});
            }
        }) 
}

exports.tipDetails = (request, response) => {
    const {id_tip} = request.params
    Tips.getDetails (id_tip, (error, tip_details) => {
        if (error) {
            response.send (error.message);
        }
        else {
            response.status(200).json({"tip": tip_details});
        }
    })
}

exports.deleteTip = (request, response) => {
    const {id_tip} = request.params;
    Tips.deleteOneTip(id_tip,  (error, result) => {
        if (error) {
        response.send (error.message);
        }
        else {
        response.status(200).json({message: "suppression ", result});
        }
    })     
}

exports.recentTips = (request, response) => {
    Tips.getRecentTips((error, result) => {
        if(error) {
            response.send(error.message);
        }
        else{
            response.status(200).json({result});
        }
    })
}

exports.search = (request, response) => {
    console.log('called');

        const city = request.query.city;
        const country = request.query.country;
        const type = request.query.type;
        if(request.query.city) {
            Tips.city(city, type, (error, result) => {
                if (error) {
                    response.send(error.message)
                }
                else {
                    if (result.length === 0) {
                        response.status(200).json({message: "Il n'y a aucun bon plan pour ce lieu et/ou ce type"});
                    }
                    else {
                        response.status(200).json({result: result})
                    }
                }
            })
        }
        else if(request.query.country) {
            Tips.country(country, type, (error, result) => {
                if (error) {
                    response.send(error.message)
                }
                else {
                    if (result.length === 0) {
                        response.status(200).json({message: "Il n'y a aucun bon plan pour ce lieu et/ou ce type"});
                    }
                    else {
                        response.status(200).json({result: result})
                    }
                }
            })
        }
      
}

exports.myTips = (request, response) => {
    const { userId } = request.user;
    Tips.getMyTips(userId, (error, result) => {
        if (error) {
            response.send(error.message)
        }
        else {
            if (result.length === 0) {
                response.status(200).json({message: "Vous n'avez pas encore posté de bons plans."})
            }
            else {
                response.status(200).json({result: result})
            }
        }
    })
}