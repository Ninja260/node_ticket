const mongoose = require('mongoose');
const { Schema } = mongoose;

const approvalSchema = new Schema({
    order: {
        type: Number,
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    approve_user_id: Schema.Types.ObjectId,
    approve_time: Date
}, { _id: false });

const taSchema = new Schema({
    ticket_id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    approval: {
        type: [ approvalSchema ],
        required: true
    }
});

const TicketApproval = mongoose.model('TicketApproval', taSchema, 'ticket_approvals');

module.exports = TicketApproval;