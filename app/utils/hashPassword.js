const bcrypt = require('bcrypt');

/**
 * Create hash password with bcrypt
 * 
 * @param {string} password - The password string
 * @throws {Exception} Throw exception if password hashing failed
 * @returns {Promise<string>} The hashed password wrapped in promise
 */
const hashPassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUND));
        return hash;
    } catch(err) {
        console.log(err);
        throw new Exception('Password Saving Failed');
    }
}

module.exports = hashPassword;
