const TICKET = {
    LIST: 'TICKET_LIST',
    CREATE: 'TICKET_CREATE',
    EDIT: 'TICKET_EDIT',
    DELETE: 'TICKET_DELETE',
    VIEW: 'TICKET_VIEW',
    APPROVE: 'TICKET_APPROVE',
    INQUIRE: 'TICKET_INQUIRE'
};

const USER = {
    INFO: 'USER_INFO'
};

const Permission = {
    TICKET: TICKET,
    USER: USER,
    all: [...Object.values(TICKET), ...Object.values(USER)]
};

module.exports = Permission;