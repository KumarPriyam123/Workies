const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schedule Schema
const ScheduleSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  generated_at: {
    type: Date,
    default: Date.now
  },
  generated_by_ai: {
    type: Boolean,
    default: false
  },
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
