const mongoose = require('mongoose');
const Permission = require('../constants/permission');

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: [
        {
            type: String,
            enum: Permission.all
        }
    ]
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;