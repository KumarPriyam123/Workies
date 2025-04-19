const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Team Member Schema
const TeamMemberSchema = new Schema({
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String
  },
  role: {
    type: String,
    required: true
  },
  joined_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
