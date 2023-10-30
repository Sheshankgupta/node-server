const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Import body-parser
const config = require('dotenv').config();
const cors = require('cors')

// Set up body-parser middleware
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
app.use(cors())
// Other middleware and configurations

app.post('/', (req, res) => {
  res.send('hello')
})

app.post('/upload', (req, res) => {
  // Access the data array from the request body
  const { data } = req.body;

  if (Array.isArray(data)) {
    // If data is wrapped in an array, unwrap it
    const formData = data;
    console.log('Received formData:', formData);
    // You can now work with the formData array
  } else {
    // Handle the case when data is not wrapped in an array
    console.log('Received data:', data);
  }

  // Continue with your processing

  res.json({ message: 'Data received successfully', success: true, responseCode: 200 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
