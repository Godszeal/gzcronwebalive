// gzcronwebalive/index.js
const cron = require('node-cron');
const axios = require('axios');
const EventEmitter = require('events');
const events = new EventEmitter();

function startCron(opts = {}) {
  const port = opts.port || process.env.PORT || 3000;
  const url = opts.url || process.env.SELF_PING_URL || `http://localhost:${port}`;
  const schedule = opts.schedule || '* * * * *'; // every minute

  const task = cron.schedule(schedule, async () => {
    const pinging = `🔁 Pinging self to keep app awake...`;
    events.emit('log', pinging);
    try {
      await axios.get(url, { timeout: 10000 });
      const ok = `✅ Self-ping successful at ${new Date().toLocaleTimeString()}`;
      events.emit('log', ok);
    } catch (err) {
      const fail = `⚠️ Self-ping failed at ${new Date().toLocaleTimeString()}: ${err.message}`;
      events.emit('log', fail);
    }
  }, { scheduled: true });

  return { task, stop() { task.stop(); }, start() { task.start(); } };
}

module.exports = { startCron, events };
