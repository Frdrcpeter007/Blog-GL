const db = require('./Database');
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const bcrypt = require('bcryptjs');

const collection = {
    value: null
}

/**
 * Module d'initialisation d'une collection dans la BDD
 * @param {ClassDecorator} db La class gérant la connexion à la bdd
 */
function initialize(db) {
    collection.value = db.get().collection("Users")
}

module.exports = {

    /**
     * Module d'inscription du client
     * @param {ObjectConstructor} newClient Le document à enregistrer
     * @param {Function} callback La fonction de retour
     */
    register(req, res) {
        try {
            if (req.body.password == req.body.cpassword) {
                accountAlreadyExists(req.body, (isTrue, message, result) => {
                    if (isTrue) {
                            var clearPswd = `BLOG${req.body.password}GL`;
    
                            bcrypt.hash(clearPswd, 10, (err, hash) => {
                                if (err) {
                                    res.status(200).send({
                                        state: false,
                                        message: "Une erreur est survenue lors du cryptage de mot de passe : " + err
                                    })
                                } else {
                                    var entity = require('./entities/Users').Users();
    
                                    entity.prenom = req.body.prenom;
                                    entity.nom = req.body.nom;
                                    entity.email = req.body.email;
                                    entity.password = hash;
    
                                    collection.value.insertOne(entity, (err, result) => {
                                        if (err) {
                                            res.status(200).send({
                                                state: false,
                                                message: "Une erreur est survenue lors de l'inscription du client: " + err
                                            })
                                        } else {
                                            if (result) {
                                                res.status(201).send({
                                                    state: true,
                                                    message: "Votre compte a été crée avec succès",
                                                    result: result.ops[0]
                                                })
                                            } else {
                                                res.status(200).send({
                                                    state: false,
                                                    message: "Aucun enreg."
                                                })
                                            }
                                        }
                                    })
                                }
                            })
                        
                    } else {
                        res.status(200).send({
                            state: false,
                            message: message
                        })
                    }
                })
            } else {
                res.status(200).send({
                    state: false,
                    message: "Les deux mot de passe ne correspondent pas !"
                })
            }
        } catch (exception) {
            res.status(200).send({
                state: false,
                message: "Une exception a été lévée lors de l'inscription du client: " + exception
            })
        }
    }
}

/**
 * Fonction de test de l'existance du compte
 * @param {ObjectConstructor} props L'objet de test
 * @param {Fucntion} callback La fonction de retour
 */
function accountAlreadyExists(props, callback) {
    if (EMAIL_REGEX.test(props.email)) {
        initialize(db);
        collection.value.aggregate([{
            "$match": {
                "email": props.email,
                "flag": true
            }
        }]).toArray((err, resultAggr) => {
            if (err) {
                callback(false, "Processus momentanément bloqué cause de : " + err)
            } else {
                if (resultAggr.length > 0) {
                    callback(false, "Cette adresse email est déjà utilisée")
                } else {
                    callback(true, "Autorisation de crée")
                }
            }
        })

    } else {
        callback(false, "Adresse email invalide")
    }

}