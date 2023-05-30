const roleType = require('../constants/roleType');
const roleService =  require('../services/role');
const Permission = require('../constants/permission');

const seedRoles = async () => {
    const roles = await roleService.getAll();
    if(roles.length != 0) return;
    
    await roleService.create({
        name: roleType.STAFF,
        permissions: [
            Permission.USER.INFO,
            Permission.TICKET.LIST,
            Permission.TICKET.CREATE,
            Permission.TICKET.DELETE,
            Permission.TICKET.EDIT,
            Permission.TICKET.VIEW
        ]
    });

    await roleService.create({
        name: roleType.SUPERVISOR,
        permissions: [
            Permission.USER.INFO,
            Permission.TICKET.LIST,
            Permission.TICKET.VIEW,
            Permission.TICKET.APPROVE,
            Permission.TICKET.INQUIRE
        ]
    });

    await roleService.create({
        name: roleType.LEADER,
        permissions: [
            Permission.USER.INFO,
            Permission.TICKET.LIST,
            Permission.TICKET.VIEW,
            Permission.TICKET.APPROVE,
            Permission.TICKET.INQUIRE
        ]
    });
}

module.exports = seedRoles;