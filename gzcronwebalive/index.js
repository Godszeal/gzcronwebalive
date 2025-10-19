// gzcronwebalive/index.js
const cron = require('node-cron');
const axios = require('axios');
const EventEmitter = require('events');
const events = new EventEmitter();
const chalk = require('chalk');

// default options & control object
function startCron(opts = {}) {
  const port = opts.port || process.env.PORT || 3000;
  const url = opts.url || process.env.SELF_PING_URL || `http://localhost:${port}`;
  const schedule = opts.schedule || '* * * * *'; // every minute by default
  const timeout = opts.timeout || 10000;

  const task = cron.schedule(schedule, async () => {
    const pinging = `🔁 Pinging self to keep app awake...`;
    // emit event for external UIs
    events.emit('log', pinging);
    try {
      await axios.get(url, { timeout });
      const ok = `✅ Self-ping successful at ${new Date().toLocaleTimeString()}`;
      events.emit('log', ok);
    } catch (err) {
      const fail = `⚠️ Self-ping failed at ${new Date().toLocaleTimeString()}: ${err.message}`;
      events.emit('log', fail);
    }
  }, { scheduled: true });

  // return a managed API (task + helpers)
  return {
    task,
    stop() { task.stop(); },
    start() { task.start(); },
    isRunning() { return task.getStatus && task.getStatus().scheduled !== false; }, // best-effort
    url, schedule
  };
}

module.exports = { startCron, events };
