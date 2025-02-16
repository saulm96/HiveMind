import authController from "./authController.js";

async function register(req, res){
    try {
        const {name, lastName, username, email, password, confirmedPassword} = req.body;
        const result = await authController.register(name, lastName, username, email, password, confirmedPassword);
        res.status(200).send(result);
    } catch (error) {
        error.status ? res.status(error.status) : res.status(500);
        res.json({ error: error.message })
    }
}

export const functions = {
    register
}

export default functions;
