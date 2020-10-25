var mongodb = require("mongodb");

var state = {
    db: null
}

module.exports = {
    /**
     * Module de connexion à la base de données
     * @param {String} url La chaine de connexion
     */
    connect(url) {
        return new Promise((resolve, reject) => {
            if (state.db) {
                resolve({state: true, message: "Une connexion existe déjà!"})
            } else {
    
                if (url) {
                    mongodb.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
                        if (err) {
                            reject({state: false, message: "Une erreur est survenue lors de la connexion : " + err})
                        } else {
    
                            state.db = client.db("blog-GL");
                            resolve({state: true, message: ">>> Connexion établie avec la base de données du \"Blog de génie logiciel\"..."})
                        }
                    })
                } else {
                    reject({state: false, message: "La chaine de connexion est null"})
                }
            }
        })
    },

    /**
     * Module de récupération de la connexion en cours
     */
    get() {
        return state.db;
    }
}