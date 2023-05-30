const Role = require('../models/role');
const mongoose = require('mongoose');

/**
 * Save Role
 * 
 * @param {object} role - javascript object
 * @param {string} role.name - Name of role
 * @param {string[]} role.permissions - Permission array 
 * @returns {Promise<Role>} Returns Role document wrapped in Promise
 */
exports.save = async (role) => {
    const { name, permissions } = role;
    const _role = new Role({
        name,
        permissions
    });

    return await _role.save();
}

/**
 * Get Role by role_id
 * 
 * @param {mongoose.Schema.Types.ObjectId} role_id - Role id 
 * @returns {Promise<Role>} - Returns Role wrapped in Promise
 */
exports.findById = async (role_id) => {
    return await Role.findById(role_id);
}

/**
 * Get all Roles
 * 
 * @returns {Promise<Array<Role>>} Returns Array of Roles wrapped in Promise
 */
exports.findAll = async () => {
    return await Role.find();
}