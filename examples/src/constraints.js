const usernameConstraints = {
    presence: true,
    email: true,
}

const passwordConstraints = {
    presence: true,
    length: {
        minimum: 6,
        message: "must be at least 6 characters",
    },
}

const phoneConstraints = {
    presence: true,
    length: {
        minimum: 9,
        message: "must be at least 9 characters",
    },
}

export {
    usernameConstraints,
    passwordConstraints,
    phoneConstraints
}