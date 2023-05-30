const roleRepo = require('../repositories/role');

/**
 * Create Role
 * 
 * @param {object} role - javascript object
 * @param {string} role.name - Name of role
 * @param {string[]} role.permissions - Permission array 
 * @returns {Promise<Role>} Returns Role document wrapped in Promise
 */
exports.create = async (role) => {
    return await roleRepo.save(role);
}

/**
 * Get All Roles
 * 
 * @returns {Promise<Array<Role>>} Returns Array of Roles wrapped in Promise
 */
exports.getAll = async () => {
    return await roleRepo.findAll();
}

/**
 * Find role by id
 * 
 * @param {mongoose.Schema.Types.ObjectId} id - role id
 * @returns {Promise<Role>} Returns Role wrapped in Promise
 */
exports.findById = async(id) => {
    return await roleRepo.findById(id);
}