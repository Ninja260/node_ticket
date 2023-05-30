const mongoose = require('mongoose');
const { Schema } = mongoose;
const TicketStatus = require('../constants/ticketStatus');

const ticketSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    issuer_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    created_time: {
        type: Date,
        required: true
    },
    approver_role_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    approver_ids: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }],
    next_approver_role_id: {
        type: mongoose.Schema.Types.ObjectId
    },
    status: {
        type: String,
        enum: [
            TicketStatus.REVIEW,
            TicketStatus.INQUIRY,
            TicketStatus.PROCEED
        ],
        required: true
    },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;