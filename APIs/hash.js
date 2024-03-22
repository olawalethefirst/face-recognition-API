const bcrypt = require('bcrypt');
const saltRounds = 10;


const hashText = (text) => {
    const salt = bcrypt.genSaltSync(saltRounds);

    return bcrypt.hashSync(text, salt,) 
};

const compareHash = (text, hash) => {
    return bcrypt.compareSync(text, hash);
};

module.exports = {
    hashText,
    compareHash
}