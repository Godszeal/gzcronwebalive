// gzcronwebalive - keep Node.js app awake by self-pinging
const cron = require('node-cron');
const axios = require('axios');
const ora = require('ora');
const c = require('chalk');

module.exports = function gzCronWebAlive(opts = {}) {
  const port = opts.port || process.env.PORT || 3000;
  const url = opts.url || process.env.SELF_PING_URL || `http://localhost:${port}`;
  const schedule = opts.schedule || '* * * * *'; // every minute by default

  const task = cron.schedule(schedule, async () => {
    const spinner = ora({
      text: c.cyan(`🔁 Pinging self to keep app awake...`),
      spinner: 'dots'
    }).start();

    try {
      await axios.get(url, { timeout: 10000 });
      spinner.succeed(c.green(`✅ Self-ping successful at ${new Date().toLocaleTimeString()}`));
    } catch (err) {
      spinner.fail(c.red(`⚠️ Self-ping failed at ${new Date().toLocaleTimeString()}: ${err.message}`));
    }
  }, { scheduled: true });

  // return control API
  return {
    stop() { task.stop(); },
    start() { task.start(); },
    getTask() { return task; },
    url, schedule
  };
};
