const express = require('express');
const router = express.Router();

router.get('/hello', (req, res) => {
  const instanceId = process.env.VERCEL_REGION || 'local';
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    message: "Hello from Vercel instance!",
    time: new Date().toISOString(),
    instanceId: instanceId,
    memory: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
    },
    pid: process.pid,
    requestId: Math.random().toString(36).substring(7),
    headers: {
      'x-vercel-id': req.headers['x-vercel-id'],
      'x-forwarded-for': req.headers['x-forwarded-for']
    }
  });
});

router.get('/load-test', (req, res) => {
  const start = Date.now();
  
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.random();
  }
  
  const duration = Date.now() - start;
  
  res.status(200).json({
    message: "Load test completed",
    processingTime: `${duration}ms`,
    result: Math.round(result),
    timestamp: new Date().toISOString(),
    instanceInfo: {
      pid: process.pid,
      region: process.env.VERCEL_REGION || 'local',
      requestId: Math.random().toString(36).substring(7)
    }
  });
});

module.exports = router;