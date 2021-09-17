const bcrypt = require('bcrypt');


const EncryptPassword =  async (password) => {
    let result = await bcrypt.hash(password, 10);
    return result;
}

const DecryptPassword = async(client_password, db_password) => {
    return await bcrypt.compare(client_password, db_password);
}


module.exports = {
    EncryptPassword,
    DecryptPassword
}