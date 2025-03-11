class USER_NOT_FOUND extends Error {
    constructor() {
        super('User not found'),
            this.status = 404;
    }
}

class INVALID_CREDENTIALS_IN_LOGIN extends Error {
    constructor() {
        super('Invalid credentials in login'),
            this.status = 401;
    }
}

class PASSWORD_DONT_MATCH extends Error {
    constructor() {
        super('Password dont match'),
            this.status = 401;
    }
}

class MISSING_PARAMETERS extends Error {
    constructor() {
        super('Missing parameters'),
            this.status = 400;
    }
}

class PASSWORDS_DONT_MATCH extends Error {
    constructor() {
        super('Password dont match'),
            this.status = 401;
    }
}

class EMAIL_OR_USERNAME_ALREADY_IN_USE extends Error {
    constructor() {
        super('Email or username already in use'),
            this.status = 400;
    }
}

class EMAIL_NOT_VERIFIED extends Error {
    constructor() {
        super('Please verify your email before logging in'),
            this.status = 400;
    }
}

class INVALID_TOKEN extends Error {
    constructor() {
        super('Invalid token'),
            this.status = 401;
    }
}

class EMAIL_ALREADY_VERIFIED extends Error {
    constructor() {
        super('Email already verified'),
            this.status = 400;
    }
}

class TOKEN_NOT_SAVED extends Error {
    constructor() {
        super('Token not saved'),
            this.status = 500;
    }
}

export const errors = {
    USER_NOT_FOUND,
    INVALID_CREDENTIALS_IN_LOGIN,
    PASSWORD_DONT_MATCH,
    MISSING_PARAMETERS,
    PASSWORDS_DONT_MATCH,
    EMAIL_OR_USERNAME_ALREADY_IN_USE,
    EMAIL_NOT_VERIFIED,
    INVALID_TOKEN,
    EMAIL_ALREADY_VERIFIED,
    TOKEN_NOT_SAVED

}

export default errors;