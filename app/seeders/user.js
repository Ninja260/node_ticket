const userService = require('../services/user');
const roleService = require('../services/role');
const RoleType = require('../constants/roleType');

const seedUsers = async () => {
    const users = await userService.getAll();
    if(users.length != 0) return;

    const roles = await roleService.getAll();
    
    let staff, supervisor, leader;
    for(let role of roles) {
        switch(role.name) {
            case RoleType.STAFF: 
                staff = role;
                break;
            case RoleType.SUPERVISOR:
                supervisor = role;
                break;
            case RoleType.LEADER:
                leader = role;
        }
    }

    await userService.create({
        name: 'Emily Thompson',
        email: 'emily.thompson@example.com',
        password: '123456',
        role_id: staff._id
    });

    await userService.create({
        name: 'Jacob Wilson',
        email: 'jacob.wilson@example.com',
        password: '123456',
        role_id: supervisor._id
    });

    await userService.create({
        name: 'Sophia Davis',
        email: 'sophia.davis@example.com',
        password: '123456',
        role_id: leader._id
    });
}

module.exports = seedUsers;