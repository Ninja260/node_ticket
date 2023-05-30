const mongoose = require('mongoose');
const TicketStatus = require('../constants/ticketStatus');
const ticketRepo = require('../repositories/ticket');
const ticketApprovalRepo = require('../repositories/ticketApproval');
const ticketApprovalConfigRepo = require('../repositories/ticketApprovalConfig');
const roleRepo = require('../repositories/role');
const logRepo = require('../repositories/log');
const Ticket = require('../models/ticket');
const RoleType = require('../constants/roleType');
const { error } = require('../utils/errorUtils');
const TicketAction = require('../event_emitters/ticketAction');
const Action = require('../constants/action');

// if cannot find next role id it will return undefined
// which is fine for the use case
const getNextApproveRoleId = (ta) => {
    let approval = ta.approval;
    var role_id = approval.sort((a, b) => a.order - b.order)
        .reduce((id, curr) => {
            if(!curr.approve_user_id && !curr.approve_time && !id) {
                id = curr.role_id;
            }
            return id;
        }, undefined);
    
    return role_id;
}

/**
 * Create Ticket
 * 
 * @param {object} ticket - Javascript object
 * @param {string} ticket.topic - Topic of the ticket
 * @param {string} ticket.description - Description of the ticket
 * @param {mongoose.Schema.Types.ObjectId} ticket.issuer_id - Issuer id of the ticket
 * @param {object} user - User object
 * @param {mongoose.Schema.Types.ObjectId} user._id - User id
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - User's role id
 * @returns {Promise<void>}
 */
exports.create = async (ticket, user) => {
    // create ticket
    const tac = await ticketApprovalConfigRepo.getAll();
    const role_ids = tac.map(item => item.role_id);
    const create_time = Date.now();
    const _ticket = await ticketRepo.save({
        ...ticket,
        status: TicketStatus.REVIEW,
        created_time: create_time,
        approver_role_ids: role_ids,
        approver_ids: []
    });

    // create ticket approval
    const ticketApproval = await ticketApprovalRepo.save({
        ticket_id: _ticket._id,
        approval: tac.map((item) => {
            return {
                order: item.order,
                role_id: item.role_id
            };
        })
    });

    _ticket.next_approver_role_id = getNextApproveRoleId(ticketApproval);
    await _ticket.save();

    TicketAction.emit(Action.TICKET.SUBMIT, _ticket, user, create_time);
}

/**
 * Approve the ticket
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id - Ticket id
 * @param {object} user - User object
 * @param {mongoose.Schema.Types.ObjectId} user._id - User id
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - User's role id
 * @returns {Promise<void>}
 */
exports.approve = async (ticket_id, user) => {
    const ticket = await ticketRepo.findById(ticket_id);
    if (!ticket) throw error('Ticket cannot be found.');

    const ta = await ticketApprovalRepo.findByTicketId(ticket_id);
    if (!ta) throw error('Ticket Approval cannot be found.');

    const currApproval = ta.approval.find((record) => record.role_id == user.role_id);
    if (!currApproval)
        throw error('You are not authorized to approve ticket.');
    if (currApproval.approve_user_id && currApproval.approve_time)
        throw error('Ticket already approved.');

    let lastApproval, nextApproval;
    for (let record of ta.approval) {
        if (record.order == currApproval.order - 1)
            lastApproval = record;

        if (record.order == currApproval.order + 1)
            nextApproval = record;
    }

    if (lastApproval && (!lastApproval.approve_user_id || !lastApproval.approve_time))
        throw error('Ticket need approval from other user first.');

    // proceed to approve ticket
    currApproval.approve_user_id = user._id;
    currApproval.approve_time = Date.now();
    ta.markModified('approval');
    await ta.save();

    ticket.approver_ids = [...ticket.approver_ids, user._id];
    ticket.status = !nextApproval ? TicketStatus.PROCEED : TicketStatus.REVIEW;
    ticket.next_approver_role_id = !nextApproval ? undefined: nextApproval.role_id;
    await ticket.save();

    TicketAction.emit(Action.TICKET.APPROVE, ticket, user, currApproval.approve_time);
}

/**
 * Inquire the ticket
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id - Ticket id
 * @param {object} user - User object
 * @param {mongoose.Schema.Types.ObjectId} user._id - User id
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - User's role id
 * @returns {Promise<void>} Returns void wrapped in Promise
 */
exports.inquire = async (ticket_id, user) => {
    const ticket = await ticketRepo.findById(ticket_id);
    if (!ticket) throw error('Ticket cannot be found.');

    const ta = await ticketApprovalRepo.findByTicketId(ticket_id);
    if (!ta) throw error('Ticket Approval cannot be found.');

    await ticketApprovalRepo.deleteByTicketId(ticket_id);

    ticket.approver_ids = [];
    ticket.approver_role_ids = [];
    ticket.next_approver_role_id = undefined;
    ticket.status = TicketStatus.INQUIRY;
    await ticket.save();

    TicketAction.emit(Action.TICKET.INQUIRE_MORE_INFO, ticket, user, Date.now());
}

/**
 * Delete ticket by id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id - Ticket id
 * @returns {Promise<void>}
 */
exports.delete = async (ticket_id) => {
    const ticket = await ticketRepo.findById(ticket_id);
    if (!ticket) throw error('Ticket cannot be found.');

    await ticketApprovalRepo.deleteByTicketId(ticket_id);
    await ticketRepo.deleteById(ticket_id);
}

/**
 * Create Ticket
 * 
 * @param {object} ticket - Javascript object
 * @param {mongoose.Schema.Types.ObjectId} ticket.id- Ticket id
 * @param {string} ticket.topic - Topic of the ticket
 * @param {string} ticket.description - Description of the ticket
 * @param {object} user - User object
 * @param {mongoose.Schema.Types.ObjectId} user._id - User id
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - User's role id
 * @returns {Promise<void>}
 */
exports.edit = async (ticket, user) => {
    const _ticket = await ticketRepo.findById(ticket.id);
    if (!_ticket) throw error('Ticket cannot be found.');

    if (_ticket.status != TicketStatus.INQUIRY) {
        throw error(`Ticket cannot be edited in ${ticket.status}`);
    }

    _ticket.topic = ticket.topic;
    _ticket.description = ticket.description;

    if (_ticket.status == TicketStatus.INQUIRY) {
        const tac = await ticketApprovalConfigRepo.getAll();

        _ticket.status = TicketStatus.REVIEW;
        const role_ids = tac.map(item => item.role_id);
        _ticket.approver_role_ids = role_ids;
        _ticket.approver_ids = [];

        const ticketApproval = await ticketApprovalRepo.save({
            ticket_id: _ticket._id,
            approval: tac.map((item) => {
                return {
                    order: item.order,
                    role_id: item.role_id
                };
            })
        });

        _ticket.next_approver_role_id = getNextApproveRoleId(ticketApproval);
    }
    await _ticket.save();

    TicketAction.emit(Action.TICKET.UPDATE, _ticket, user, Date.now());
}

/**
 * Get Ticket by Id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id - Ticket id
 * @returns {Promise<Ticket>} Return Ticket wrapped in Promise
 */
exports.getById = async (ticket_id) => {
    const ticket = await ticketRepo.findById(ticket_id);
    if (!ticket) throw error('Ticket cannot be found.');

    return ticket;
}

/**
 * Get Logs by ticket id
 * 
 * @param {mongoose.Schema.Types.ObjectId} ticket_id - ticket id
 * @returns {Promise<Log>} Return Log wrapped in Promise
 */
exports.getLogs = async (ticket_id) => {
    return await logRepo.getLogs('tickets', ticket_id);
}

/**
 * 
 * @param {'all'|'concern'} type - Filter type
 * @param {string} search - Search string
 * @param {object} user - User object
 * @param {mongoose.Schema.Types.ObjectId} user._id - User id
 * @param {string} user.name - User name
 * @param {string} user.email - User email
 * @param {mongoose.Schema.Types.ObjectId} user.role_id - User's role id
 * @returns {Promise<Array<object>>} Returns array of Ticket wrapped in Promise
 */
exports.getList = async (type, search, user) => {
    const _search = new RegExp(search, "i");
    const _topicSearch = search ? { $regex: _search } : undefined;
    if (type == 'all') {
        const filter = {};
        if(search) filter.topic = _topicSearch;

        return await ticketRepo.findManyByFilter(filter);
    }

    if (type != 'concern') throw error('Invalid type filter');

    const role = await roleRepo.findById(user.role_id);
    if (!role) throw error('Role not found.');

    if (role.name == RoleType.STAFF) {
        const filter = {
            issuer_id: user._id,
        };
        if(search) filter.topic = _topicSearch;
        return await ticketRepo.findManyByFilter(filter);
    }

    if ( [RoleType.SUPERVISOR, RoleType.LEADER].includes(role.name) ) {
        const filter = {
            $or: [
                { approver_ids: user._id },
                { next_approver_role_id: user.role_id }
            ]
        }
        if(search) filter.topic = _topicSearch;
        return await ticketRepo.findManyByFilter(filter);
    }

    throw error('Unauthorized.', {
        httpStatus: 403
    });
}