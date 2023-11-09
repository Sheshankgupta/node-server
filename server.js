const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Import body-parser
const config = require('dotenv').config();
const cors = require('cors')
// const tesseract = require('node-tesseract-ocr')
const { createWorker } = require('tesseract.js');

// let worker;

// (async () => {
//   worker = await createWorker('eng');
//   await worker.loadLanguage('eng');
//   await worker.initialize('eng');
// })();

// Set up body-parser middleware
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 50000 }));
app.use(cors())
// Other middleware and configurations

app.get('/', (req, res) => {
  res.send('hello')
})

app.post('/upload', async (req, res) => {
  // Access the data array from the request body
  // const { data } = req.body;

  // if (Array.isArray(data)) {
  //   // If data is wrapped in an array, unwrap it
  //   const formData = data;
  //   console.log('Received formData:', formData);
  //   // You can now work with the formData array
  // } else {
  //   // Handle the case when data is not wrapped in an array
  //   console.log('Received data:', data);
  // }

  // Continue with your processing

  // const imageArray = req.body;
  // let base64Image = imageArray[0].split(';base64,').pop();
  // const imgBuffer = Buffer.from(base64Image, 'base64')
  // const text = await tesseract.recognize(imgBuffer)
  // console.log(text)

  res.json({ message: 'Data received successfully', success: true, responseCode: 200 });
});

app.post('/image', async (req, res) => {
  const image = req.body.data;
  const id = req.body.id;
  const base64Image = image.split(';base64,').pop();
  const imgBuffer = Buffer.from(base64Image, 'base64');

  const worker = await createWorker('eng');
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  // const text = await tesseract.recognize(imgBuffer);
  try {
    const { data: { text } } = await worker.recognize(imgBuffer);
    res.json({ id: id, text: text, success: true, message: 'image decoded successfully', });
  } catch (e) {
    res.json({ success: false, id: id, text: '', message: 'image could not be decoded', });
  }
  finally {
    worker.terminate();

  }

})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
