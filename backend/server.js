const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Workflow = require('./work.model');
const multer = require('multer');
const csvtojson = require('csvtojson');
const axios = require('axios');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5900;

app.use(cors());
app.use(express.json());
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.post('/execute-workflow', upload.single('file'), async (req, res) => {
  try {
    const { workflowId, workflowData } = req.body;
    const workflow = await Workflow.findById(workflowId);

    if (!workflow) {
      return res.status(404).json({ error: 'Workflow not found' });
    }

    const parsedWorkflowData = JSON.parse(workflowData);

    let processedData = req.file.buffer.toString();
    for (const node of parsedWorkflowData.nodes) {
      switch (node.type) {
        case 'FilterData':
          processedData = filterData(processedData);
          break;
        case 'Wait':
          await wait(60000);
          break;
        case 'ConvertFormat':
          processedData = convertFormat(processedData);
          break;
        case 'SendPOSTRequest':
          await sendPOSTRequest(processedData);
          break;
        default:
          break;
      
      }
    }
    res.status(200).json({ message: 'Workflow executed successfully', data: processedData });
  } catch (error) {
    console.error('Error executing workflow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function convertFormat(data) {
  const jsonData = [];
  const lines = data.split('\n');
  const headers = lines[0].split(',');
  
  for (let i = 1; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length === headers.length) {
      const entry = {};
      for (let j = 0; j < headers.length; j++) {
        entry[headers[j].trim()] = currentLine[j].trim();
      }
      jsonData.push(entry);
    }
  }
  return jsonData;
}

async function sendPOSTRequest(data) {
  try {
   
    const response = await axios.post('https://requestcatcher.com/', data);
    return response.data;
  } catch (error) {
    console.error('Error sending POST request:', error);
    throw new Error('Error sending POST request');
  }
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/workflows', async (req, res) => {
  try {
    const workflows = await Workflow.find();
    res.status(200).json(workflows);
  } catch (error) {
    console.error('Error fetching workflows:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/save-workflow', async (req, res) => {
  try {
    const { workflowData } = req.body;
    console.log('Received workflow data:', workflowData); 
    const workflow = new Workflow({ nodes: JSON.parse(workflowData).nodes });
    const savedWorkflow = await workflow.save();

    res.status(200).json({ message: 'Workflow saved successfully', workflowId: savedWorkflow._id });
  } catch (error) {
    console.error('Error saving workflow:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
