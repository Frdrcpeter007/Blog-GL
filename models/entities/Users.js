module.exports = {
    Users() {
        return {
            nom: String,
            prenom: String,
            email: String,
            password: String,
            flag: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
}