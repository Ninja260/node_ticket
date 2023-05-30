const TICKET = {
    SUBMIT: 'TICKET_SUBMIT',
    UPDATE: 'TICKET_UPDATE',
    INQUIRE_MORE_INFO: 'TICKET_INQUIRE_MORE_INFO',
    APPROVE: 'TICKET_APPROVE',
    PROCEED: 'TICKET_PROCEED'
};

const Action = {
    TICKET: TICKET,
    all: [ ...Object.values(TICKET) ]
};

module.exports = Action;