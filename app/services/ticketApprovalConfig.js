const tacRepo = require('../repositories/ticketApprovalConfig');

/**
 * Create TicketApprovalConfig
 * 
 * @param {object} tac - Ticket approval config
 * @param {number} tac.order - Order of approval
 * @param {role_id} tac.role_id - Role id of approver
 * @returns {Promise<TicketApprovalConfig>}
 */
exports.create = async (tac) => {
    return await tacRepo.save(tac);
}

/**
 * Get All TicketApprovalConfig
 * 
 * @returns {Promise<Array<TicketApprovalConfig>>} Retuns Array of TicketApprovalConfig
 */
exports.getAll = async () => {
    return await tacRepo.getAll();
}