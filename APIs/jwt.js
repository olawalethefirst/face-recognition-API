var jwt = require('jsonwebtoken');


const signData = (data) => {
    const token = jwt.sign(data, 'shhhhh');
}

const verifyToken = (token) => {
    const response = { successful: false, data: null, error: null }
    try {
        const decoded = jwt.verify(token, 'shhhhh');
        response.data = decoded;
    } catch (error) {
        response.error = error;
    }

    return response;
}

module.exports = {
    signData,
    verifyToken
}