const express = require('express');
const app = express();

app.use(express.json());

const testScaleRoute = require('./api/test-scale/route');

app.use('/api/test-scale', testScaleRoute);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    region: process.env.VERCEL_REGION || 'local'
  });
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Vercel Scalable API',
    endpoints: [
      '/health',
      '/api/test-scale/hello',
      '/api/test-scale/load-test'
    ],
    region: process.env.VERCEL_REGION || 'local'
  });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;