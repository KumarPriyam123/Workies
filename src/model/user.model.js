const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    name: {
    type: String,
    required: true
    },
    email: {
    type: String,
    required: true,
    unique: true
    },
    password: {
    type: String,
    required: true
    },
    theme_settings: {
    type: String,
    default: 'dark'
    },
    view_preference: {
    type: String,
    enum: ['kanban', 'table', 'calendar'],
    default: 'kanban'
    },
    created_at: {
    type: Date,
    default: Date.now
    }
});











const User = mongoose.model('User', UserSchema);
const Task = mongoose.model('Task', TaskSchema);
const Schedule = mongoose.model('Schedule', ScheduleSchema);
const Team = mongoose.model('Team', TeamSchema);
const TeamMember = mongoose.model('TeamMember', TeamMemberSchema);
const Assignment = mongoose.model('Assignment', AssignmentSchema);
const UserBehavior = mongoose.model('UserBehavior', UserBehaviorSchema);

module.exports = {
  User,
  Task,
  Schedule,
  Team,
  TeamMember,
  Assignment,
  UserBehavior
};
