const TicketApproval = require('../models/ticketApproval');

/**
 * Save TicketApproval
 * 
 * @param {object} ta - javascript object
 * @returns {Promise<TicketApproval>}
 */
exports.save = async (ta) => {
    const { ticket_id, approval } = ta;
    const _ta = new TicketApproval({
        ticket_id,
        approval
    });

    return await _ta.save();
}

/**
 * Delete TicketApproval by ticket_id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id
 * @returns {Promise<void>}
 */
exports.deleteByTicketId = async (ticket_id) =>  {
    await TicketApproval.findOneAndDelete({
        ticket_id: ticket_id
    });
}

/**
 * Find TicketApproval by ticket_id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id 
 * @returns {Promise<TicketApproval>}
 */
exports.findByTicketId = async (ticket_id) => {
    return await TicketApproval.findOne({
        ticket_id: ticket_id
    });
}