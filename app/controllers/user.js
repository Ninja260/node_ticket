const resultJson = require('../utils/resultJson');
const checkPermission = require('../utils/checkPermission');
const Permission = require('../constants/permission');
const userService = require('../services/user');

exports.get = async (req, res, next) => {
    try {
        checkPermission(req.role, Permission.USER.INFO);
        const user = await userService.getById(req.user._id);
        const _user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: req.role
        };

        res.json(resultJson(_user));
    } catch(err) {
        console.log(err.message);
        next(err);
    }
}