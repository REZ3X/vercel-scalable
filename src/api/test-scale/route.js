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
  
  let sum = 0;
  for (let i = 0; i < 1e7; i++) {
    sum += i;
  }
  
  const duration = Date.now() - start;
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    message: "Heavy load test completed",
    sum: sum,
    processingTime: `${duration}ms`,
    timestamp: new Date().toISOString(),
    instanceInfo: {
      pid: process.pid,
      region: process.env.VERCEL_REGION || 'local',
      requestId: Math.random().toString(36).substring(7),
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
      }
    }
  });
});

router.get('/extreme-load', (req, res) => {
  const start = Date.now();
  
  let sum = 0;
  let iterations = parseInt(req.query.iterations) || 5e7;
  
  for (let i = 0; i < iterations; i++) {
    sum += Math.sqrt(i) * Math.random();
  }
  
  const duration = Date.now() - start;
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    message: "Extreme load test completed",
    iterations: iterations,
    sum: Math.round(sum),
    processingTime: `${duration}ms`,
    timestamp: new Date().toISOString(),
    instanceInfo: {
      pid: process.pid,
      region: process.env.VERCEL_REGION || 'local',
      requestId: Math.random().toString(36).substring(7),
      cpuIntensive: true,
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`
      }
    }
  });
});

module.exports = router;