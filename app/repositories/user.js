const User = require('../models/user');
/**
 * Save User
 * 
 * @param {object} user - javascript object
 * @returns {Promise<User>}
 */
exports.save = async (user) => {
    const _user = new User({
        name: user.name,
        email: user.email,
        password: user.password,
        role_id: user.role_id
    });
    return await _user.save();
}

/**
 * Find by Email
 * 
 * @param {string} email - The eamil
 * @returns {Promise<User>} The User document wrapped in promise
 */
exports.findByEmail = async (email) => {
    return await User.findOne({email});
}

/**
 * Get all Users
 * 
 * @returns {Promise<Array<User>>} Returns Array of User wrapped in Promise
 */
exports.findAll = async () => {
    return await User.find();
}

/**
 * Get user by id
 * 
 * @param {mongoose.Schema.Types.ObjectId} id - User id
 * @returns {Promise<User>} Returns User
 */
exports.findById = async(id) => {
    return await User.findById(id);
}