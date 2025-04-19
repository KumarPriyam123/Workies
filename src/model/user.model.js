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

module.exports = {
    User
};
