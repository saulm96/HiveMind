import userController from "./userController.js"



async function getUserByUsername(req, res) {
    try {
        const user = await userController.getUserByUsername(req.params.username)
        res.status(200).send(user)
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

export const functions = {
    getUserByUsername,
}

export default functions;