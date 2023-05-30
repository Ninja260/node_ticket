const bcrypt = require('bcrypt');

/**
 * Check whether the plain password and hashed password match
 * 
 * @param {string} str1 - The plain password 
 * @param {string} str2 - The hashed password
 * @throws {Exception} - Thorow exception if compare password failed
 * @returns {Promise<boolean>} - Boolean status wrapped in promise
 */
const isPasswordMatch = async (str1, str2) => {
    try {
        const match = await bcrypt.compare(str1, str2);
        return match;
    } catch(err) {
        console.log(err);
        throw new Exception('Compare password failed.');
    }
}

module.exports = isPasswordMatch;