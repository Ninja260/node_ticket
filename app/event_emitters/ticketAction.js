const EventEmitter = require('events');
const Action = require('../constants/action');
const logService = require('../services/log');

class _TicketAction extends EventEmitter {
    constructor() {
        super();
    }
}

const entity = 'tickets';

const TicketAction = new _TicketAction();

TicketAction.on(Action.TICKET.SUBMIT, async (ticket, user, time) => {
    await logService.create({
        entity: entity,
        entity_id: ticket._id,
        action: Action.TICKET.SUBMIT,
        actor_id: user._id,
        role_id: user.role_id,
        time: time,
        text: `${user.name} submitted the ticket.`
    })

    // TODO: send notification
});

TicketAction.on(Action.TICKET.UPDATE, async (ticket, user, time) => {
    await logService.create({
        entity: entity,
        entity_id: ticket._id,
        action: Action.TICKET.UPDATE,
        actor_id: user._id,
        role_id: user.role_id,
        time: time,
        text: `${user.name} update the ticket.`
    });

    // TODO: send notification
});

TicketAction.on(Action.TICKET.APPROVE, async (ticket, user, time) => {
    await logService.create({
        entity: entity,
        entity_id: ticket._id,
        action: Action.TICKET.APPROVE,
        actor_id: user._id,
        role_id: user.role_id,
        time: time,
        text: `${user.name} approved the ticket.`
    });

    const isApprovalFinished = ticket.approver_ids.length == ticket.approver_role_ids.length;
    if(isApprovalFinished) {
        await logService.create({
            entity: entity,
            entity_id: ticket._id,
            action: Action.TICKET.PROCEED,
            actor_id: user._id,
            role_id: user.role_id,
            time: Date.now(),
            text: `The Ticket is now moved to proceed.`
        });
    }

    // TODO: send notification
    // if is Approval Finished -> send notification to issuer
    // if still need to approve -> send notification to next approver
});

TicketAction.on(Action.TICKET.INQUIRE_MORE_INFO, async (ticket, user, time) => {
    await logService.create({
        entity: entity,
        entity_id: ticket._id,
        action: Action.TICKET.INQUIRE_MORE_INFO,
        actor_id: user._id,
        role_id: user.role_id,
        time: time,
        text: `${user.name} inquired more info about the ticket.`
    });

    // TODO: send notification
    // TODO: send notification to issuer
});

module.exports = TicketAction;

