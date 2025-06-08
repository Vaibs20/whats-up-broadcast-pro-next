import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  contactGroups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ContactGroup'
  }],
  contacts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact'
  }],
  variables: {
    type: Map,
    of: String,
    default: new Map()
  },
  scheduledAt: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'sending', 'completed', 'paused', 'cancelled', 'failed'],
    default: 'scheduled'
  },
  progress: {
    total: { type: Number, default: 0 },
    sent: { type: Number, default: 0 },
    delivered: { type: Number, default: 0 },
    read: { type: Number, default: 0 },
    failed: { type: Number, default: 0 }
  },
  jobId: {
    type: String,
    unique: true,
    sparse: true
  },
  createdBy: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  rateLimitPerMinute: {
    type: Number,
    default: 60
  }
}, {
  timestamps: true
});

campaignSchema.index({ scheduledAt: 1, status: 1 });
campaignSchema.index({ jobId: 1 });

export default mongoose.model('Campaign', campaignSchema);