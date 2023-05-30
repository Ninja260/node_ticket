const Log = require('../models/log');

/**
 * Save Log
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
exports.save = async (log) => {
    const _log = new Log({
        entity: log.entity,
        entity_id: log.entity_id,
        action: log.action,
        actor_id: log.actor_id,
        role_id: log.role_id,
        time: log.time,
        text: log.text
    });

    return await _log.save();
}

/**
 * Delete Log by filter parameter
 * 
 * @param {object} filter - javascript object to filter the documents 
 */
exports.deleteManyByFilter = async (filter) => {
    await Log.deleteMany(filter);
}


exports.getLogs = async (entity, entity_id) => {
    return await Log.find({
        entity: entity,
        entity_id: entity_id
    });
}
