const jwt = require('jsonwebtoken');
const { jwToken } = require("../constants")


const generateToken = (data) => {
    return  jwt.sign(data, jwToken.SECRET_KEY, {
        expiresIn: "7d"
    });

}

const verifyToken = (token) => {
    const response = { successful: false, data: null, error: null }

    try {
        const decoded = jwt.verify(token, jwToken.SECRET_KEY);

        response.successful = true;
        response.data = decoded;
    } catch (error) {
        console.error({name:"Error verifying token", error})

        response.error = error;
    }

    return response;
}

module.exports = {
    generateToken,
    verifyToken
}