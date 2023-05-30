const mongoose = require('mongoose');
const { Schema } = mongoose;
const Action = require('../constants/action');

const logSchema = new Schema({
    entity: {
        type: String,
        required: true
    },
    entity_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    action: {
        type: String, 
        enum: Action.all
    },
    actor_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    role_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;