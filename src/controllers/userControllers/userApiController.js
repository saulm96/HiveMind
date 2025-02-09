import userController from "./userController.js"

async function getAllUsers(req, res) {
    try {
        const users = await userController.getAllUsers()
        res.json(users);
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
    deactivateUser,
}

export default functions;