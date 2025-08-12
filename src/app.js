const express = require('express');
const app = express();

app.use(express.json());

const testScaleRoute = require('./api/test-scale/route');

app.use('/api/test-scale', testScaleRoute);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;