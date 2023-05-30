const mongoose = require('mongoose');
const { Schema } = mongoose;

const tacSchema = new Schema({
    order: {
        type: Number,
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
})

const TicketApprovalConfig = mongoose.model('TicketApprovalConfig', tacSchema, 'ticket_approval_configs');

module.exports = TicketApprovalConfig;