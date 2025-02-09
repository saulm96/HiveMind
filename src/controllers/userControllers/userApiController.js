import userController from "./userController.js"

async function getAllUsers(req, res){
    try {;
        const users = await userController.getAllUsers()
        res.json(users);
    } catch (error) {
        error.status ? res.status(error.status): res.status(500);
        res.json({error: error.message})
    }
}

export const functions = {
    getAllUsers
}

export default functions;