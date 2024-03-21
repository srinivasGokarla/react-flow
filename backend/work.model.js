const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nodes: {
    type: [{ type: String, enum: ['FilterData', 'Wait', 'ConvertFormat', 'SendPOSTRequest'] }],
    required: true
  },
  connections: {
    type: [
      {
        source: { type: String, required: true },
        target: { type: String, required: true }
      }
    ],
    required: true
  }
});

const Workflow = mongoose.model('Workflow', workflowSchema);

module.exports = Workflow;