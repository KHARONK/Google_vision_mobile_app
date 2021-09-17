const jwt = require('jsonwebtoken');
const secret = "adinkrasecret12345xyz";


const GenerateToken = (user) => {
    return jwt.sign({ id: user.id }, secret);
}

module.exports = {
    GenerateToken
}