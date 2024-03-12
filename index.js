const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/image', async (req, res) => {
  try {
    const imageUrl = req.query.url;

    if (!imageUrl) {
      return res.status(400).json({ error: 'Image URL is required.' });
    }

    // Fetch the image using Axios
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    // Set appropriate headers for the image
    res.setHeader('Content-Type', imageResponse.headers['content-type']);
    res.setHeader('Content-Length', imageResponse.headers['content-length']);
    res.send(imageResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Image Proxy Server is running on http://localhost:${PORT}`);
});
