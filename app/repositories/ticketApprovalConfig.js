const TicketApprovalConfig = require('../models/ticketApprovalConfig');

/**
 * Save TicketApprovalConfig
 * 
 * @param {object} tac - Ticket approval config
 * @param {number} tac.order - Order of approval
 * @param {role_id} tac.role_id - Role id of approver
 * @returns {Promise<TicketApprovalConfig>}
 */
exports.save = async (tac) => {
    const { order, role_id } = tac;
    const _tac = new TicketApprovalConfig({
        order, role_id
    });

    return await _tac.save();
}

/**
 * Get all TicketApprovalConfig
 * 
 * @returns {Promise<Array<TicketApprovalConfig>>} Returns Array of TicketApprovalConfig
 */
exports.getAll = async () => {
    return await TicketApprovalConfig.find({});
}