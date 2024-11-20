const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String, required: true 
    },
    submissionDate: {
        type: Date, required: true 
    },
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed', 'Overdue'], 
        default: 'Pending',
    },
    assignedTo: {
        type: [String],
        required: false, 
    },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
