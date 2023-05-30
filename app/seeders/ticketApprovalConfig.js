const tacService = require('../services/ticketApprovalConfig');
const roleService = require('../services/role');
const RoleType = require('../constants/roleType');

const seedTicketApprovalConfigs = async () => {
    const tacList = await tacService.getAll();
    if(tacList.length != 0) return;

    const roles = await roleService.getAll();

    let supervisor, leader;
    for(let role of roles) {
        switch(role.name) {
            case RoleType.SUPERVISOR:
                supervisor = role;
                break;
            case RoleType.LEADER:
                leader = role;
        }
    }

    await tacService.create({
        order: 1,
        role_id: supervisor._id
    });

    await tacService.create({
        order: 2,
        role_id: leader._id
    });
}

module.exports = seedTicketApprovalConfigs;