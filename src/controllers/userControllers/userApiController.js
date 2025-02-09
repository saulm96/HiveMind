import userController from "./userController.js"


//User getters for API
async function getAllUsers(req, res) {
    try {
        const users = await userController.getAllUsers()
        res.json(users);
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}
async function getUserById(req, res) {
    try {
        const user = await userController.getUserById(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

async function getUserByUsername(req, res) {
    try {
        const user = await userController.getUserByUsername(req.params.username)
        res.status(200).send(user)
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

async function getUserByEmail(req, res) {
    try {
        const user = await userController.getUserByEmail(req.params.email)
        res.status(200).send(user)
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

async function deactivateUser(req, res) {
    try {
        const user = await userController.deactivateUser(req.params.user_id)
        res.status(200).send(user)
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

export const functions = {
    getAllUsers,
    getUserByUsername,
    getUserById,
    getUserByEmail,
    deactivateUser,
}

export default functions;