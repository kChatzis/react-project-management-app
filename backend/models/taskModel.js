const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    column: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    },
    order: {
        type: Number,
    }
});

module.exports = mongoose.model('Task', taskSchema);
