const Tips = require("../models/tips");

exports.addOne = (request, response) => {
    const { id } = request.user;
    const {place_name, description, city, country, publish, type, user_id} = request.body;
    if (!place_name || !description || !city || !country || !publish || !type|| !user_id ) {
        response.status(400).json({message: "Missing input"})
    }
    Tips.createTip(id, request.body, (error, result) => {
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