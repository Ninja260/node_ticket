const Ticket = require('../models/ticket');

/**
 * Save Ticket
 * 
 * @param {object} ticket - javascript object
 * @returns {Promise<Ticket>}
 */
exports.save = async (ticket) => {
    const { topic, description, issuer_id, created_time, status, approver_role_ids, approver_ids } = ticket;
    const _ticket = new Ticket({
        topic,
        description,
        issuer_id,
        created_time,
        approver_role_ids,
        approver_ids,
        status
    });

    return await _ticket.save();
}

/**
 * Find ticket by _id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id 
 * @returns 
 */
exports.findById = async (ticket_id) => {
    return await Ticket.findById(ticket_id);
}

/**
 * Find Tickets with filter
 * 
 * @param {object} filter - javascript object
 * @returns {Promise<Array<Ticket>>}
 */
exports.findManyByFilter = async (filter) => {
    return await Ticket.find(filter);
}

/**
 * Delete Ticket by id
 * 
 * @param {mongoose.Schema.Types.ObjectId} id
 * @returns {Promise<void>}
 */
exports.deleteById = async (id) => {
    await Ticket.findByIdAndDelete(id);
}