const logRepo = require('../repositories/log');

/**
 * Create log
 * 
 * @param {object} log - javascript object
 * @param {string} log.entity - collection name
 * @param {string} log.entity_id - id of document that exists in the collection
 * @param {string} log.action - action 
 * @param {mongoose.Schema.Types.ObjectId} log.actor_id - actor id
 * @param {mongoose.Schema.Types.ObjectId} log.role_id - role id
 * @param {Date} log.time - time at which the action performed
 * @param {string} log.text - Log text
 * @returns {Promise<Log>}
 */
exports.create = async (log) => {
    return await logRepo.save(log);
}