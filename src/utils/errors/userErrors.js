class USER_NOT_FOUND extends Error {
    constructor(){
        super('User not found'),
        this.status = 404;
    }
}

class INVALID_CREDENTIALS_IN_LOGIN extends Error {
    constructor(){
        super('Invalid credentials in login'),
        this.status = 401;
    }
}

class PASSWORD_DONT_MATCH extends Error {
    constructor(){
        super('Password dont match'),
        this.status = 401;
    }
}

class MISSING_PARAMETERS extends Error {
    constructor(){
        super('Missing parameters'),
        this.status = 400;
    }
}

export const errors = {
    USER_NOT_FOUND,
    INVALID_CREDENTIALS_IN_LOGIN,
    PASSWORD_DONT_MATCH,
    MISSING_PARAMETERS

}

export default errors;