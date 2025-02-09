class USER_NOT_FOUND extends Error {
    constructor(){
        super('User not found'),
        this.status = 404;
    }
}


export const errors = {
    USER_NOT_FOUND
}

export default errors;