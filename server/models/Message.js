import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: true
  },
  contactId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'read', 'failed'],
    default: 'pending'
  },
  whatsappMessageId: {
    type: String,
    unique: true,
    sparse: true
  },
  sentAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  readAt: {
    type: Date
  },
  errorMessage: {
    type: String
  },
  retryCount: {
    type: Number,
    default: 0
  },
  maxRetries: {
    type: Number,
    default: 3
  }
}, {
  timestamps: true
});

messageSchema.index({ campaignId: 1, status: 1 });
messageSchema.index({ contactId: 1 });
messageSchema.index({ whatsappMessageId: 1 });

export default mongoose.model('Message', messageSchema);