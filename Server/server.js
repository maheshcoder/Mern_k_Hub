const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Data = require('./models/Data');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB connection (update the connection URL with your own database credentials)
const MONGODB_URI = 'mongodb://localhost:27017/your_database_name';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});


// Define the endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Get the uploaded file details from req.file
  if (!req.file) {
    return res.status(400).json({ message: 'No file received' });
  }

  // Check the file type (optional)
  if (!req.file.mimetype.startsWith('text/csv') && !req.file.mimetype.startsWith('application/json')) {
    fs.unlinkSync(req.file.path); // Remove the uploaded file if it's not a valid type
    return res.status(400).json({ message: 'Invalid file type. Supported types: CSV, JSON' });
  }

  // Process the uploaded file based on its type
  if (req.file.mimetype.startsWith('text/csv')) {
    // If it's a CSV file, process it accordingly
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => {
        // Assuming CSV has 'field1' and 'field2' columns
        results.push({
          field1: data.field1,
          field2: parseFloat(data.field2),
        });
      })
      .on('end', () => {
        // Save the processed data into the MongoDB collection
        DataModel.insertMany(results)
          .then(() => {
            fs.unlinkSync(req.file.path); // Remove the uploaded file after processing
            res.json({ message: 'File uploaded and processed successfully' });
          })
          .catch((err) => {
            console.error(err);
            fs.unlinkSync(req.file.path); // Remove the uploaded file on error
            res.status(500).json({ message: 'Internal server error' });
          });
      });
  } else if (req.file.mimetype.startsWith('application/json')) {
    // If it's a JSON file, process it accordingly
    fs.readFile(req.file.path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        fs.unlinkSync(req.file.path); // Remove the uploaded file on error
        return res.status(500).json({ message: 'Internal server error' });
      }

      try {
        const jsonData = JSON.parse(data);
        // Save the processed data into the MongoDB collection
        DataModel.insertMany(jsonData)
          .then(() => {
            fs.unlinkSync(req.file.path); // Remove the uploaded file after processing
            res.json({ message: 'File uploaded and processed successfully' });
          })
          .catch((err) => {
            console.error(err);
            fs.unlinkSync(req.file.path); // Remove the uploaded file on error
            res.status(500).json({ message: 'Internal server error' });
          });
      } catch (parseErr) {
        console.error(parseErr);
        fs.unlinkSync(req.file.path); // Remove the uploaded file on parsing error
        res.status(400).json({ message: 'Invalid JSON data in the file' });
      }
    });
  }
});

// Data retrieval route
app.get('/api/data', (req, res) => {
  Data.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// ... (previous code)
