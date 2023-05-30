const userRepo = require('../repositories/user');
const hashPassword = require('../utils/hashPassword');
const mongoose = require('mongoose');
const User = require('../models/user');

/**
 * Find by Email
 * 
 * @param {string} email - The email
 * @returns {Promise<User>} The User document wrapped in promise
 */
exports.findByEmail = async (email) => {
    return await userRepo.findByEmail(email);
}

/**
 * Create user
 * 
 * @param {object} user - javascript object
 * @param {string} user.name - Name of user
 * @param {string} user.email - Email of user
 * @param {string} user.password - Password of user
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - Role id of user
 * @returns {Promise<User>} Returns created user document
 */
exports.create = async (user) => {
    const _user = { ...user };
    _user.password = await hashPassword(_user.password);
    
    return await userRepo.save(_user);
}

/**
 * Get all Users
 * 
 * @returns {Promise<Array<User>>} Returns Array of User wrapped in Promise
 */
exports.getAll = async () => {
    return await userRepo.findAll();
}

/**
 * Get User by id
 * 
 * @param {mongoose.Schema.Types.ObjectId} id - User id
 * @returns 
 */
exports.getById = async(id) => {
    return await userRepo.findById(id);
}