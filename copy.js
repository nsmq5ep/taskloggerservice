const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'client')));

const HARPERDB_URL = 'YOUR_HARPERDB_INSTANCE_URL';
const HARPERDB_USERNAME = 'YOUR_HARPERDB_USERNAME';
const HARPERDB_PASSWORD = 'YOUR_HARPERDB_PASSWORD';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(HARPERDB_USERNAME + ':' + HARPERDB_PASSWORD).toString('base64')
  }
};

// Create
app.post('/create', async (req, res) => {
  const data = {
    operation: 'insert',
    schema: 'taskloggerdb',
    table: 'tasks',
    records: [
      req.body
    ]
  };
  try {
    const response = await axios.post(HARPERDB_URL, data, config);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

// Read
app.get('/read', async (req, res) => {
  const data = {
    operation: 'search_by_value',
    schema: 'taskloggerdb',
    table: 'tasks',
    search_attribute: 'taskNumber',
    search_value: '*',
    get_attributes: ['*']
  };
  try {
    const response = await axios.post(HARPERDB_URL, data, config);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

// Update
app.put('/update', async (req, res) => {
  const data = {
    operation: 'update',
    schema: 'taskloggerdb',
    table: 'tasks',
    records: [
      req.body
    ]
  };
  try {
    const response = await axios.post(HARPERDB_URL, data, config);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

// Delete
app.delete('/delete', async (req, res) => {
  const data = {
    operation: 'delete',
    schema: 'taskloggerdb',
    table: 'tasks',
    hash_values: [req.body.taskNumber]
  };
  try {
    const response = await axios.post(HARPERDB_URL, data, config);
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
