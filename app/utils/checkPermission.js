const { error } = require("./errorUtils");

/**
 * Check Permission
 * 
 * @param {Role} role - Role
 * @param {string} permission - Permission to match with Role's Permissions
 */
function checkPermission(role, permission) {
    if (!role || !role.permissions.includes(permission)) {
        throw error(
            "You don't have permission to do the action.",
            {
                httpStatus: 403
            }
        );
    }
}

module.exports = checkPermission;